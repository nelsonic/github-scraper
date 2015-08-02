var wreck   = require('wreck');
var cheerio = require('cheerio');

module.exports = function following (url, callback) {
  if(!url || url.length === 0 || typeof url === 'undefined'){
    return callback(400);
  }
  if(url.indexOf('page=') === -1) { // e.g: /tj/followers?page=2
    url = 'https://github.com' + '/' + url + '/following'; // becomes https://github.com/{username}/followers
  }
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var data = { entries : [] };
      var $    = cheerio.load(html);
      $('.follow-list-item').each(function () {
        data.entries.push($(this).find('a').attr('href').replace("/", ""));
      });
      var next = $('.pagination > a').filter(function () {
        return $(this).text() === "Next";
      });
      if(next.length > 0) {
        data.next = next['0'].attribs.href;
      }
      callback(error, data)
    }
  });
}
