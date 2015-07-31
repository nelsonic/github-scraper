var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * org method scrapes a given GitHub organisation
 * @param {string} orgname - a valid GitHub orgname
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - the basic organsiation data
 */
function org(orgname, callback) {
  console.log(orgname);
  if(!orgname || orgname.length === 0 || typeof orgname === 'undefined'){
    return callback(400);
  }
  var url, baseUrl = 'https://github.com';
  if(orgname.indexOf('page=') > -1) { // e.g: /dwyl?page=2
    url = baseUrl + orgname;       // becomes https://github.com/dwyl?page=2
  }
  else {
    url = baseUrl + '/' + orgname; // becomes https://github.com/dwyl
  }
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {

      var $ = cheerio.load(html);
      var data = {};

      callback(null, data);
    }
  });
}

module.exports = org
