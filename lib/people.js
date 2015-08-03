var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * issue method scrapes a given GitHub organisation's PUBLIC People
 * @param {string} org - a valid GitHub organisation in the format {user}/{project}
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {array} list - list of People who have made their membership Public
 */
module.exports = function stargazers (org, callback) {
  if(!org || org.length === 0 || typeof org === 'undefined'){
    return callback(400);
  }
  if(org.charAt(0) !== '/') { // add preceeding forward slash if not present
    org = '/' + org;
  }
  var url = org;
  if(url.indexOf('page=') === -1) { // e.g: https://github.com/orgs/github/people?page=2
    url = 'https://github.com/orgs' + org + '/people';
  } // eg: https://github.com/orgs/dwyl/people
  else {
    url = 'https://github.com' +url
  }
  console.log(url)
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var data = { entries : [] }, u;
      var $    = cheerio.load(html);
      $('.member-info').each(function () {
        u = $(this).find('a').attr('href').replace("/", "")
        data.entries.push(u);
      });
      var next = $('.pagination > a').filter(function () {
        return $(this).text() === "Next";
      });
      if(next.length > 0) {
        data.next = next['0'].attribs.href;
      }
      callback(error, data)
    }
  });
}
