/**
 * starred method scrapes a given GitHub user's starred repos list
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} url - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error an error object (set to null if no error occurred)
 *  @param {object} data - list of (Public) GitHub repositories stared by user
 */
module.exports = function starred ($, url, callback) {
  var data = { entries : [], url: url };
  $('.repo-list-name').each(function () {
    data.entries.push($(this).find('a').attr('href'));
  });
  data = require('./next_page')($, data); // don't worry this gets cached ;-)
  return callback(null, data);
}
