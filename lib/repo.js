var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * repo method scrapes a given GitHub repository page
 * @param {string} project - a valid GitHub repository name
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error - an error object (set to null if no error occurred)
 *  @param {array} stats - list of (Public) information on the GitHub repository
 */

function repo (project, callback) {
  if(!project || project.length === 0 || typeof project === 'undefined'){
    return callback(400);
  }
  var url = 'https://github.com/' + project
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var $ = cheerio.load(html);
      var stats = { "url" : url};
      stats.desc     = $('.repository-description').text().trim();
      stats.website  = $('.repository-website').text().trim();
      var badges = $('.social-count');
      // console.log(badges);
      stats.watchers = parseInt(badges['0'].children[0].data.trim(), 10);
      stats.stars    = parseInt(badges['1'].children[0].data.trim(), 10);
      stats.forks    = parseInt(badges['2'].children[0].data.trim(), 10);
      stats.commits  = parseInt($('.commits .num').text().trim(), 10);
      stats.branches = parseInt($('.octicon-git-branch').next().text().trim(), 10);
      stats.releases = parseInt($('.octicon-tag').next().text().trim(), 10);
      // language stats .repository-lang-stats-graph
      stats.langs = [];
      var langs = $('.repository-lang-stats-graph .language-color');
      stats.langs.push(langs['0'].attribs['aria-label']);
      if(langs['1'] && langs['1'].attribs && langs['1'].attribs['aria-label']) {
        stats.langs.push( langs['1'].attribs['aria-label'] );
      }
      return callback(error, stats)
    }
  });
}

module.exports = repo;
