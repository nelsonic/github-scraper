module.exports = function followers ($, url, callback) {
  var data = { entries : [], url: url };
  $('.follow-list-item').each(function () {
    data.entries.push($(this).find('a').attr('href').replace("/", ""));
  });
  data = require('./next_page')($, data); // don't worry this gets cached ;-)
  callback(null, data)
}
