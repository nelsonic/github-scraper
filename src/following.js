var request = require('request');
var cheerio = require('cheerio');

// basic info
function following(user, callback) {
  request('https://github.com/' + user + '/following', function (error, response, html) {
    if (!error && response.statusCode === 200) {

      var $ = cheerio.load(html);

      var f = {};

      $('.follow-list-name').each(function () {
        console.log($(this).find('a').attr('href').replace("/", ""));
      })
      

      callback(null, f);

    } else {
      callback(response.statusCode);
    }
  });
}

module.exports = {
  following: following
}

following('iteles', function (err, s) {
  console.log(s);
});

