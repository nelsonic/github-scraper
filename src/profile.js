var request = require('request');
var cheerio = require('cheerio');

// basic info
function profile(user, callback) {
  if(!user || user.length === 0 || typeof user === 'undefined'){
    return callback(400);
  }
  request('https://github.com/' + user, function (error, response, html) {
    if (!error && response.statusCode === 200) {

      var $ = cheerio.load(html);
      var p = {};     // profile object
      var stats = []; // global stats

      $('.vcard-stat-count').each(function () {
          var stat = $(this).text();
          // thousands
          if (stat.indexOf('k') > -1) {
            stat = parseInt(stat, 10) * 1000;
          } else {
            stat = parseInt(stat, 10);
          }
          stats.push(stat);
        });

      p.followercount  = stats[0];
      p.stared         = stats[1];
      p.followingcount = stats[2];

      // General Info
      p.worksfor = $('.vcard-detail').first().text();      // Works for
      p.location = $('.octicon-location').parent().text(); // Location
      p.fullname = $('.vcard-fullname').text();            // Full Name
      p.email = $('.email').text();                        // email address
      p.url = $('.url').text();                            // Website
      p.joined = $('.join-date').attr('datetime');         // Joined GitHub
      p.avatar = $('.avatar').attr('src');                 // Profile pic

      // Contributions to Open Source in the past 12 months
      var contribs = [];
      $('.contrib-number').each(function () {
        contribs.push($(this).text());
      });
      // if(contribp.length > 0) {
        p.contribs = parseInt(contribs[0].replace(" total", "").replace(",", ""), 10);
        p.longest  = parseInt(contribs[1].replace(" days", ""), 10);
        p.current  = parseInt(contribs[2].replace(" days", ""), 10);
      // }
      p.lastupdated = new Date().getTime();
      callback(null, p);

    } else {
      callback(response.statusCode);
    }
  });
}

module.exports = {
  profile: profile
}
