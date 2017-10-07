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
  // check if the url was set
  if(!url || url.length === 0 || typeof url === 'undefined'){
    return callback(400);
  }

  // add preceeding forward slash if not present
  if(url.charAt(0) !== '/' && url.indexOf('http') === -1) {
    url = '/' + url;
  }
  // strip github.com from url
  if(url.indexOf('github.com') !== -1) { // e.g: https://github.com/orgs/github/people?page=2
    url = url.split('https://github.com')[1];
  } // eg: https://github.com/orgs/dwyl/people
  return url;
}
