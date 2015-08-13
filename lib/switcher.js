var wreck   = require('wreck');
var cheerio = require('cheerio');
var validate = require('./url_validator');
var scrapers = require('./scrapers');
var chalk = require('chalk');

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
  var scraper; // the method we will use below
  if(!url || typeof url === 'undefined'){
    return callback(404);
  }
  url = validate(url, callback);
  // console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - - URL:')
  // console.log(url);
  // console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - \n')
  if(url.match(/\.atom/)) { // feed parser has its own request handler
    return scrapers['feed'](url, callback);
  }
  // centralised request issuer/hander
  wreck.get(url, function (error, response, html) {
    if (error || !response || response.statusCode !== 200) {
      console.log(chalk.bgRed.black(" - - - GitHub Scraper SWITCHER FAIL >> " + url + "  - - - "));
      // console.log(error, response.headers);
      // console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - -')
      callback(404);
    }
    else {
      var $ = cheerio.load(html);

      // in the case of username or orgname urls (which have exactly the same format!)
      // we need to fetch the page before we can tell which scraper to use
      if(url.match(/tab=repositories/)) {
        scraper = 'repos';
      }
      else if($('.vcard-avatar').length > 0) {
        scraper = 'profile';
      }
      else if($('.org-name').length > 0){
        scraper = 'org';
      }
      else if(url.match(/followers|following|stargazers/)) {
        scraper = 'followers'; // html/DOM is identical for these 3 pages!
      }
      else if(url.match(/stars/)) {
        scraper = 'starred';
      }
      else if($('.commits').length > 0) {
        scraper = 'repo';
      }
      else if(url.match(/people/)) {
        scraper = 'people';
      }
      else if(url.match(/milestones/)) {
        scraper = 'milestones';
      }
      else if(url.match(/labels/)) {
        scraper = 'labels';
      }
      else if($('.issue').length > 0) {
        scraper = 'issue';
      }
      else { // else if(url.match(/issues/)) {
        scraper = 'issues';
      }
      console.log(chalk.bgGreen.black(" - - - GitHub Scraper >> "+url +" >> "+scraper + "  - - - "));
      return scrapers[scraper]($, url, callback)
    }
  });
}
