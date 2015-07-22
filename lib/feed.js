var wreck  = require('wreck');
var xml2js = require('xml2js');

/**
 * repo method scrapes a given GitHub user's repositories tab
 * @param {string} username - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {array} feed - list of recent (public) activity (for the user)
 */
function feed (username, callback) {
  if(!username || username.length === 0 || typeof username === 'undefined'){
    return callback(400);
  }
  var url = 'https://github.com/' + username + '.atom'
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {


      // return callback(error, events)
    }
  });
}

module.exports = feed;
