var wreck  = require('wreck');
var parse = require('xml2js').parseString;

/**
 * feed method parses a given GitHub user's activity feed
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} url - a valid GitHub feed url format: {username}.atom
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} repos - list of (Public) GitHub repositories (for the user)
 */
module.exports = function feed (url, callback) {
  wreck.get(url, function (error, response, xml) {
    if (error || response.statusCode !== 200) {
      // console.log(url, error, response)
      return callback(response.statusCode);
    }
    else {
      var data = {entries : [], url: url};
      parse(xml.toString(), function(err, JSON) {
        data.updated = JSON.feed.updated[0]; // when feed was last updated
        JSON.feed.entry.map(function(item) {
          // store only the date/time and action performed (space separated)
          data.entries.push(item.published[0] + ' ' + item.title[0]._);
        })
        return callback(error, data);
      });
    }
  });
}
