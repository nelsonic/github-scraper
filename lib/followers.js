var next_page = require('./next_page');

module.exports = function followers ($, url, callback) {
  var data = { entries : [], url: url };
  $('.follow-list-item').each(function () {
    data.entries.push($(this).find('a').attr('href').replace("/", ""));
  });
  data = next_page($, data);
  callback(null, data)
}
