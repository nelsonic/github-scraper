/**
 * repo method scrapes a given GitHub repository page
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} project - a valid GitHub repository name
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error - an error object (set to null if no error occurred)
 *  @param {array} data - list of (Public) information on the GitHub repository
 */

function repo ($, url, callback) {
  var data = { "url" : url};
  data.desc     = $('.repository-description').text().trim();
  data.website  = $('.repository-website').text().trim();
  var badges = $('.social-count');
  // console.log(badges);
  data.watchers = parseInt(badges['0'].children[0].data.trim(), 10);
  data.stars    = parseInt(badges['1'].children[0].data.trim(), 10);
  data.forks    = parseInt(badges['2'].children[0].data.trim(), 10);
  data.commits  = parseInt($('.commits .num').text().trim(), 10);
  data.branches = parseInt($('.octicon-git-branch').next().text().trim(), 10);
  data.releases = parseInt($('.octicon-tag').next().text().trim(), 10);
  data.langs = []; // languages used in the repo:
  var langs = $('.repository-lang-stats-graph .language-color');
  if(langs.length > 0){
    data.langs.push(langs['0'].attribs['aria-label']);
  }  
  if(langs['1'] && langs['1'].attribs && langs['1'].attribs['aria-label']) {
    data.langs.push( langs['1'].attribs['aria-label'] );
  }
  return callback(null, data)
}

module.exports = repo;
