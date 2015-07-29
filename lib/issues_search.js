var wreck   = require('wreck');
var cheerio = require('cheerio');

// var defaults = {
//   "username":"this"
// }
//
// function set_options(options) {
//
// }
//
// function set_url(options) {
//
// }

/**
 * issues_search method scrapes a given GitHub repository's issues list
 * @param {object} options - options for running the issue search
 *   username - the GitHub username
 *   query    - 'mentions', 'assignee', 'author' or 'user' (defaults to author)
 *   state    - 'open' or 'closed' (defaults to open)
 *   order    - 'desc' or 'asc' descending / assending respectively (default asc)
 *   filter   - 'created', 'updated', 'comments' (used in conjunction with order)
 * see:
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {array} list - list of (Public) GitHub issues (for the repo)
 */
function issues_search (options, callback) {
  if(!callback || typeof options === 'function') {
    callback = options;
    return callback(400);
  }
  var url = ''//'https://github.com/' + repo + '/issues'
  wreck.get(url, function (error, response, html) {
    var list = { entries : [] }; // the list we will return
    if (error || response.statusCode !== 200) {
      return callback(response.statusCode);
    }
    else {
      var $ = cheerio.load(html);


    }
    return callback(error, list);
  });
}

module.exports = issues_search;
