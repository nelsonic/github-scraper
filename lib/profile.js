/**
 * profile method scrapes a given GitHub user profile
 * @param {string} username - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - the complete GitHub Profile for the username
 */
module.exports = function profile($, url, callback) {
  var data = { entries : [], url: url };
  var stats = []; // global stats

  $('.vcard-stat-count').each(function () {
      var stat = $(this).text();
      // thousands
      if (stat.indexOf('k') > -1) {
        stat = parseFloat(stat.replace('k', ''), 10) * 1000;
      } else {
        stat = parseInt(stat, 10);
      }
      stats.push(stat);
    });

  data.followercount  = stats[0]; // number of people folling this user
  data.starred        = stats[1]; // number of repositories user has starred
  data.followingcount = stats[2]; // number of people this user is following

  // General Info
  data.worksfor = $('.vcard-detail').first().text();      // Works for
  data.location = $('.octicon-location').parent().text(); // Location
  data.fullname = $('.vcard-fullname').text();            // Full Name
  data.email    = $('.email').text();                     // email address
  data.website  = $('.url').text();                       // Website
  data.joined   = $('.join-date').attr('datetime');       // Joined GitHub
  data.avatar   = $('.avatar').attr('src');               // Profile pic

  // Contributions to Open Source in the past 12 months
  var contribs = [];
  $('.contrib-number').each(function () {
    contribs.push($(this).text());
  });
  // if(contribdata.length > 0) {
  data.contribs = parseInt(contribs[0].replace(" total", "").replace(",", ""), 10);
  data.longest  = parseInt(contribs[1].replace(" days", ""), 10);
  data.current  = parseInt(contribs[2].replace(" days", ""), 10);
  // }
  data.lastupdated = new Date().getTime();

  // extract list of (Public) organizations from profile
  var orgs = $('.avatar-group-item');
  var orgUrls = []; // '/org org-avatar-image'
  orgs.map(function(i){
    // console.log(orgs[i]);
    var img    = orgs[i].children[0].attribs.src;
    var orgurl = orgs[i].attribs.href
    orgUrls.push(orgurl + " " + img); // space separated value
  })
  data.orgs = orgUrls;

  // GitHub Developer Program member?
  var member = $('.member-badge');
  if(member && member[0] && member[0].attribs.href === 'https://developer.github.com') {
    data.developerprogram = true;
  }
  callback(null, data);
  // add task to arana to scrape /{username}?tab=repositories after profile!
}
