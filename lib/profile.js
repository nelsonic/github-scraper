
const selectors=require('../config/repos')
/**
 * profile method scrapes a given GitHub user profile
 * @param {string} username - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - the complete GitHub Profile for the username
 */
module.exports = function profile ($, url, callback) {
 console.log($(`${selectors.PROFILE}`).first().find('.user-profile-bio').text())
  var data = { url: url, type: 'profile' };
  const tmpData=[]
  const stats=[]
  data.username = url.replace('/', '');
  data.bio = $(`${selectors.PROFILE}`).first().find('.user-profile-bio').text();
  data.avatar   = $(`${selectors.PROFILE}`).first().find('.avatar-user').first().attr('src'); // avatar-user
  var parts = data.avatar.split('/');
  data.uid = parseInt(parts[parts.length-1].split('?')[0], 10);
 
  data.repos     = k_to_int($('.UnderlineNav .octicon-repo').first().next().text().trim());
  data.projects  = k_to_int($('.octicon-table').first().next().text().trim());
  data.stars     = k_to_int($('.octicon-star').next().text().trim()); // number of repositories user has starred
  data.followers = k_to_int($('.js-profile-editable-area .color-fg-default').first().text().trim());
  data.following = k_to_int($('.js-profile-editable-area .color-fg-default').eq(1).text().trim());

  // Pinned Repos

  var repos = $('.pinned-item-list-item')

  // console.log('repos: ', repos);
  data.pinned = [];
  repos.each(function (i) {
    data.pinned.push({
      url: $(this).find('a.text-bold')[0]['attribs']['href'],
      // Want More? see: https://github.com/nelsonic/github-scraper/issues/78
    })
  });
  data.name = $('.vcard-fullname').text().trim();            // Full Name
  data.worksfor = $('.p-org').first().text().trim();      // Works for
  const location = $('li[itemprop=homeLocation]')
  if(location && location.attr('aria-label')) {
    data.location = location.attr('aria-label').replace("Home location: ", '');
  }
  data.website  = $('[data-test-selector=profile-website-url] > a').attr("href")
  // data.joined   = $('.join-date').attr('datetime');       // Joined GitHub

  // Contributions to Open Source in the past 12 months
  data.contribs = parseInt($('.js-yearly-contributions').text().trim()
    .split(' contributions')[0].replace(',', ''), 10);
  // Contribution Matrix
  data = require('./profile_contribs.js')($, data);

  // List of (Public) organizations from profile
  // data-hovercard-type="organization"
  var orgs = $('.avatar-group-item');
  // console.log(orgs);
  data.orgs = {}; // https://github.com/nelsonic/github-scraper/issues/80
  orgs.each( function (i) {
    var url = orgs[i].attribs.href.replace('/', '');
    data.orgs[url] = $(this).find('img')['0'].attribs.src; // org image
  })

  // GitHub Developer Program member?
  var member = $('.octicon-cpu').parent().text().trim();
  // yes this is always on the page but the hide it using CSS!! :-(
  var display = $('.bg-purple').parent().hasClass('d-none');
  if(member && !display) {
    data.developerprogram = true;
  }
  callback(null, data);
  // add task to arana to scrape /{username}?tab=repositories after profile!
}

// transform '3.4k' to 3400
function k_to_int(val) {
  // if (val === undefined) {
  //   return 0;
  // }
  if (val.indexOf("k") > -1) {
    val = val.split("k")[0];
    val = parseFloat(val);
    val = val * 1000;
  }
  val = parseInt(val);
  return Math.floor(val)
}