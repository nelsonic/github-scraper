var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * issue method scrapes a given GitHub repository's issues list
 * @param {string} repo - a valid GitHub repository in the format {user}/{project}
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {array} list - list of (Public) GitHub issues (for the repo)
 */
function issues (repo, callback) {
  if(!repo || repo.length === 0 || typeof repo === 'undefined'){
    return callback(400);
  }
  var url = 'https://github.com/' + repo + '?tab=repositories'
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var $ = cheerio.load(html);
      var items = $('.repo-list-item');
      var repos = []; // store repos in array
      for(var i = 1; i < items.length; i++) {
        var o = {}; // individual issue object
        var parent = '.repo-list-item:nth-child(' +i +') ';
        // var a = $(parent + '.repo-list-name > a').first()['0']
        // r.url     = a.attribs.href;
        // r.name    = a.children[0].data.trim();
        // r.lang    = $(parent + '.repo-list-stats').first().text().split('\n')[1].trim();
        // r.desc    = $(parent + '.repo-list-description').first().text().trim()
        // r.info    = $(parent + '.repo-list-info').first().text().trim() || ''
        // r.stars   = $(parent + '.octicon-star').parent().first().text().trim()
        // r.forks   = $(parent + '.octicon-git-branch').parent().first().text().trim()
        // r.updated = $(parent + ' .repo-list-meta > time')[0].attribs.datetime
        // repos.push(r);
      }
      return callback(error, repos)
    }
  });
}

module.exports = issues;
