/**
 * repo method scrapes a given GitHub user's repositories tab
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} url - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error an error object (set to null if no error occurred)
 *  @param {object} data - list of (Public) GitHub repositories (for the user)
 */
module.exports = function repos ($, url, callback) {
  var data = { entries: [], url:url}; // store repos in array
  var items = $('.repo-list-item');
  for(var i = 1; i < items.length; i++) {
    var r = {};
    var parent = '.repo-list-item:nth-child(' +i +') ';
    var a = $(parent + '.repo-list-name > a').first()['0']
    r.url     = a.attribs.href;
    r.name    = a.children[0].data.trim();
    r.lang    = $(parent + '.repo-list-stats').first().text().split('\n')[1].trim();
    r.desc    = $(parent + '.repo-list-description').first().text().trim()
    r.info    = $(parent + '.repo-list-info').first().text().trim() || ''
    r.stars   = parseInt($(parent + '.octicon-star').parent().first().text().trim(), 10)
    r.forks   = $(parent + '.octicon-git-branch').parent().first().text().trim()
    r.updated = $(parent + ' .repo-list-meta > time')[0].attribs.datetime
    data.entries.push(r);
  }
  return callback(null, data)
}
