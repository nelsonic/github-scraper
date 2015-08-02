var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * profile method scrapes a given GitHub user profile
 * @param {string} username - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} profile - the complete GitHub Profile for the username
 */
function profile(username, callback) {
  if(!username || username.length === 0 || typeof username === 'undefined'){
    return callback(400);
  }
  wreck.get('https://github.com/' + username, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {

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

      p.followercount  = stats[0]; // number of people folling this user
      p.starred         = stats[1]; // number of repositories user has starred
      p.followingcount = stats[2]; // number of people this user is following

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

      // extract list of (Public) organizations from profile
      var orgs = $('.avatar-group-item');
      var orgUrls = []; // '/org org-avatar-image'
      orgs.map(function(i){
        // console.log(orgs[i]);
        var img = orgs[i].children[0].attribs.src;
        var orgurl = orgs[i].attribs.href
        orgUrls.push(orgurl + " " + img); // space separated value
      })
      p.orgs = orgUrls;

      // GitHub Developer Program member?
      var member = $('.member-badge');
      if(member && member[0] && member[0].attribs.href === 'https://developer.github.com') {
        p.developerprogram = true;
      }

      callback(null, p);
    }
  });
}

module.exports = profile
