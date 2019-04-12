/**
 * issue method scrapes a given GitHub organisation's PUBLIC People
 * @param {string} org - a valid GitHub organisation in the format {user}/{project}
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - list of People who have made their membership Public for the org
 */
module.exports = function stargazers ($, url, callback) {
  var data = { entries : [], url: url, type: 'people' };

  $('#org-members-table img.avatar').each(function (i, el) {
    var src = el.attribs.src;
    var parts = src.split('/');
    var uid = parseInt(parts[parts.length-1].split('?')[0], 10);
    data.entries.push({
      avatar: src,
      uid: uid,
      username: el.attribs.alt.replace('@', '')
    });
  });
  
  data = require('./next_page')($, data); // don't worry this gets cached ;-)
  return callback(null, data);
}
