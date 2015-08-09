/**
 * issue method scrapes a given GitHub organisation's PUBLIC People
 * @param {string} org - a valid GitHub organisation in the format {user}/{project}
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - list of People who have made their membership Public for the org
 */
module.exports = function stargazers ($, url, callback) {
  var data = { entries : [], url: url};
  $('.member-info').each(function () {
    data.entries.push($(this).find('a').attr('href').replace("/", ""));
  });
  data = require('./next_page')($, data); // don't worry this gets cached ;-)
  return callback(null, data);
}
