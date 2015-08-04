module.exports = function starred ($, url, callback) {
  var data = { entries : [], url: url };
  $('.repo-list-name').each(function () {
    data.entries.push($(this).find('a').attr('href'));
  });
  data = require('./next_page')($, data); // don't worry this gets cached ;-)
  return callback(null, data);
}
