var http_request = require('./http_request');
var cheerio = require('cheerio');
var validate = require('./url_validator');
var scrapers = require('./scrapers');

// Adding Colors to Terminal *Without* a Library/Module
var bgRedBlack = '\x1b[41m\x1b[30m';
var bgGreenBlack = '\x1b[42m\x1b[30m';
var RESET = '\x1b[0m'; // see: https://stackoverflow.com/a/41407246/1148249
/**
 * switcher is the brains of this module!
 * it decides which scraper to use for a given url
 * @param {string} url - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error an error object (set to null if no error occurred)
 *  @param {object} data - list of (Public) GitHub repositories (for the user)
 */
module.exports = function switcher (url, callback) {

  if(!callback || typeof callback !== 'function') {
    var msg = "GitHub Scraper is Asynchronous, callback is required!\n"
    msg += '\n - - - - - - - - - - - - - - - called by '
    msg += arguments.callee.caller.toString()
    msg += ' - - - - - - - - - - - - - - - \n'
    throw "ERROR: " + __filename + ":17 \n" + msg;
  }

  var scraper; // the method we will use below
  if(!url || typeof url === 'undefined'){
    return callback(404);
  }
  url = validate(url, callback); // ensure we 404 on undefined url
  // console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - - URL:')
  // console.log(url);
  // console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - \n')
  // if(url.match(/\.atom/)) { // feed parser has its own request handler
  //   return scrapers['feed'](url, callback);
  // }
  // centralised request issuer/hander
  http_request(url, function (status, html) {
    if (status !== 200 || !html) {
      console.log(bgRedBlack,
          " - - - GitHub Scraper SWITCHER FAIL >> " + url + "  - - - ", RESET);
      // console.log(error, response.headers);
      // console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - -')
      callback(status);
    }
    else {
      var $ = cheerio.load(html);

      // in the case of username or orgname urls (which have exactly the same format!)
      // we need to fetch the page before we can tell which scraper to use
      // if(url.match(/tab=repositories/)) {
      //   scraper = 'repos';
      // }
      // else
      // console.log($('.h-card'))
      if(url.match(/followers|following/)) {
        scraper = 'followers'; // html/DOM is identical for these 2 pages!
      }
      else if(url.match(/stargazers|watchers/)) {
        scraper = 'stars_watchers'; // html/DOM is identical for these 2 pages!
      }
      else if($('.org-name').length > 0){
        scraper = 'org';
      }
      else if($('.h-card').length > 0) {
        // console.log('PROFILE!!')
        scraper = 'profile';
      }
      // else if(url.match(/stars/)) {
      //   scraper = 'starred';
      // }
      // else if($('.commits').length > 0) {
      else if(url.match(/people/)) {
        scraper = 'people';
      }
      else {
        scraper = 'repo';
      }
      // else if(url.match(/milestones/)) {
      //   scraper = 'milestones';
      // }
      // else if(url.match(/labels/)) {
      //   scraper = 'labels';
      // }
      // else if($('.issue').length > 0) {
      //   scraper = 'issue';
      // }
      // else { // else if(url.match(/issues/)) {
      //   scraper = 'issues';
      // }
      console.log(bgGreenBlack,
        " - - - GitHub Scraper >> "+url +" >> "+scraper + "  - - - ", RESET);
      return scrapers[scraper]($, url, callback)
    }
  });
}
