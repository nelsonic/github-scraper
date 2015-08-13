/**
 * url_validator does exactly what its name suggests validates a url
 * @param {String} url - a (hopefully) valid GitHub url
 * @param {Function} callback - the callback we should call after scraping
 * we are simply testing for presence of a callback and its typeof 'function'
 * @returns {String} - returns the validated url or throws error!
 */
module.exports = function validator (url, callback) {
  // console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - - URL:')
  // console.log(url);
  // check for existence of a callback function
  if(!callback || typeof callback !== 'function') {
    var msg = "GitHub Scraper is Asynchronous, please supply a callback as second param!\n"
    msg += '\n - - - - - - - - - - - - - - - called by '
    msg += arguments.callee.caller.toString()
    msg += ' - - - - - - - - - - - - - - - \n'
    throw "ERROR: " + __filename + ":17 \n" + msg;
  }
  // check if the url was set
  if(!url || url.length === 0 || typeof url === 'undefined' || url.match(/undefined/)){
    return callback(400);
  }

  // add preceeding forward slash if not present
  if(url.charAt(0) !== '/' && url.charAt(0) !== 'h') {
    url = '/' + url;
  }
  // url supplied without github base url
  if(url.indexOf('github.com') === -1) { // e.g: https://github.com/orgs/github/people?page=2
    url = 'https://github.com' + url;
  } // eg: https://github.com/orgs/dwyl/people
  return url;
}
