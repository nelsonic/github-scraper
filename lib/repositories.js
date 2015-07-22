var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * repo method scrapes a given GitHub user's repositories tab
 * @param {string} username - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {array} repos - list of (Public) GitHub repositories (for the user)
 */
function repo (username, callback) {
  if(!username || username.length === 0 || typeof username === 'undefined'){
    return callback(400);
  }
  var url = 'https://github.com/' + username + '?tab=repositories'
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var $ = cheerio.load(html);
      var items = $('.repo-list-item');
      var repos = []; // store repos in array
      for(var i = 1; i < items.length; i++) {
        var r = {};
        var parent = '.repo-list-item:nth-child(' +i +') ';
        var a = $(parent + '.repo-list-name > a').first()['0']
        r.url     = a.attribs.href;
        r.name    = a.children[0].data.trim();
        r.lang    = $(parent + '.repo-list-stats').first().text().split('\n')[1].trim();
        r.desc    = $(parent + '.repo-list-description').first().text().trim()
        r.info    = $(parent + '.repo-list-info').first().text().trim() || ''
        r.stars   = $(parent + '.octicon-star').parent().first().text().trim()
        r.forks   = $(parent + '.octicon-git-branch').parent().first().text().trim()
        r.updated = $(parent + ' .repo-list-meta > time')[0].attribs.datetime
        repos.push(r);
      }
      return callback(error, repos)
    }
  });
}

module.exports = repo;
