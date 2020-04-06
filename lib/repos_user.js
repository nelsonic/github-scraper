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
  var items = $('.source');
  // console.log('items.length:', items.length)
  for(var i = 1; i < items.length; i++) {
    var r = {};
    var parent = '.source:nth-child(' + i +') ';
    // console.log(parent)
    var a = $('.wb-break-all > a', parent)
    if(a && a.length > 0) {
      a = a['0']
      r.url     = a.attribs.href;
      r.name    = a.children[0].data.trim();
    }
    // see: http://stackoverflow.com/questions/7969414/ (find element by itemprop)
    var lang = $(parent + 'span[itemprop="programmingLanguage"]');

    if(lang && lang.length > 0) {
      r.lang = lang['0'].children[0].data
    } 
    r.desc    = $(parent + '.repo-list-description').first().text().trim()
    r.info    = $(parent + '.repo-list-info').first().text().trim() || ''
    r.stars   = parseInt($(parent + '.octicon-star').parent().first().text().trim(), 10)
    r.forks   = $(parent + '.octicon-git-branch').parent().first().text().trim()
    var updated = $(parent + ' relative-time');
    if (updated && updated.length > 0) {
      r.updated = updated['0'].attribs.datetime
    }
    
    data.entries.push(r);
  }
  return callback(null, data)
}
