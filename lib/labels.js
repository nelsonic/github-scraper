var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * repo method scrapes a given GitHub repository page
 * @param {string} project - a valid GitHub repository name
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error - an error object (set to null if no error occurred)
 *  @param {array} list - list of labels with colors for the GitHub repository
 */

function labels (project, callback) {
  if(!project || project.length === 0 || typeof project === 'undefined'){
    return callback(400);
  }
  var url = 'https://github.com/' + project +'/labels'
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var $ = cheerio.load(html);
      var list = [];
      var items = $('.issue-list-item');
      for(var i = 1; i < items.length; i++) {
        var label = ''
        list.push(label);
      }
      return callback(error, list)
    }
  });
}

module.exports = labels;
