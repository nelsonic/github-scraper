var wreck   = require('wreck');
var cheerio = require('cheerio');

module.exports = function followers (url, callback) {
  if(!url || url.length === 0 || typeof url === 'undefined'){
    return callback(400);
  }
  if(url.indexOf('page=') === -1) { // e.g: /dwyl?page=2
    url = 'https://github.com' + '/' + url + '/followers'; // becomes https://github.com/{username}/followers
  }
  wreck.get(url, function (error, response, html) {
    console.log(url);
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var data = { followers : [] }, u;
      var $    = cheerio.load(html);
      $('.follow-list-item').each(function () {
        u = $(this).find('a').attr('href').replace("/", "")
        data.followers.push(u);
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
