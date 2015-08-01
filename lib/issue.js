var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * profile method scrapes a given GitHub user profile
 * @param {string} url - a valid GitHub issue url
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} profile - the complete GitHub Profile for the url
 */
module.exports = function issue(url, callback) {
  if(!url || url.length === 0 || typeof url === 'undefined'){
    return callback(400);
  }
  wreck.get('https://github.com/' + url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {

      var $ = cheerio.load(html);
      var data = {};     // generic raw data object

      callback(null, data);
    }
  });
}
