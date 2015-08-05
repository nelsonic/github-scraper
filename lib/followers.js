/**
 * followers method parses a given GitHub user's followers/following/stars list
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} url - a valid GitHub username or url e.g: /{username}
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - list of (Public) GitHub repositories (for the user)
 */
module.exports = function followers ($, url, callback) {
  var data = { entries : [], url: url };
  $('.follow-list-item').each(function () {
    data.entries.push($(this).find('a').attr('href').replace("/", ""));
  });
  data = require('./next_page')($, data); // don't worry this gets cached ;-)
  callback(null, data)
}
