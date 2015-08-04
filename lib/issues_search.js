var wreck   = require('wreck');
var cheerio = require('cheerio');

var baseUrl = 'https://github.com';
var defaults = {
  "username" : "this",   // username is kinda the point of the query!
  "query"    : "author", // all issues created by the user (anywhere!)
  "state"    : "open",   // not too worried about the closed ones at first
  "order"    : "desc",   // newest first!
  "filter"   : "created" // created date
};

function set_options(options) {
  var keys = Object.keys(defaults);
  keys.map(function(k){
    options[k] = options[k] || defaults[k];
  })
  return options;
}
/**
 * format: https://github.com/search?type=Issues&
 * q={query}%3A{username}&state={state}&o={order}&s={filter}
 */
function set_url(options) {
  var url = baseUrl + '/search?type=Issues';
  url += '&q=' + options.query + '%3A' + options.username;
  url += '&state=' + options.state;
  url += '&o=' + options.order;
  url += '&s=' + options.filter;
  return url;
}

/**
 * issues_search method scrapes a given GitHub repository's issues list
 * @param {object} options - options for running the issue search
 *   username - the GitHub username
 *   query    - 'mentions', 'assignee', 'author' or 'user' (defaults to author)
 *   state    - 'open' or 'closed' (defaults to open)
 *   order    - 'desc' or 'asc' descending / assending respectively (default desc)
 *   filter   - 'created', 'updated', 'comments' (used in conjunction with order)
 * see: README/issues>search
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {objects} list - list of (Public) GitHub issues (for the repo)
 */
module.exports = function issues_search (options, callback) {
  if(!callback || typeof options === 'function') {
    callback = options;
    return callback(400);
  }
  var url;
  if(options.next) { // if we are parsing the next page of results!
    url = baseUrl + options.next;
  }
  else {
    options = set_options(options); // apply defaults for any unset keys
    url = set_url(options);         // generate search url
  }
  console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - search url:')
  console.log(url);
  wreck.get(url, function (error, response, html) {
    var list = { entries : [] }; // the list we will return
    var $ = cheerio.load(html);
    // console.log(html.toString());
    var items = $('.issue-list-item');
    for(var i = 1; i < items.length; i++) {
      var o = {};
      var parent = '.issue-list-item:nth-child(' +i +') ';
      var a      = $(parent + '.title > a').first();
      o.title    = a.text()// ['0'].title;
      o.url      = a['0'].attribs.href;
      var re = new RegExp('\n', 'g');
      o.desc     = $(parent + '.description').first().text().replace(re, '').trim();
      o.author   = $(parent + '.issue-list-meta > li:nth-child(2) > a')['0'].attribs.title;
      o.created  = $(parent + '.issue-list-meta > li:nth-child(2) > time')['0'].attribs.datetime;
      var coms   = $(parent + '.issue-list-meta > li:nth-child(3) > strong')['0'];
      if(coms) {
        o.comments = parseInt(coms.children[0].data, 10);
      }
      list.entries.push(o);
    }
    var next = $('.next_page')
    if(next.length > 0) {
      list.next = next['0'].attribs.href;
    }

    return callback(error, list);
  });
}
