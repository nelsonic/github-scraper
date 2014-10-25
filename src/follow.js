var request = require('request');
var cheerio = require('cheerio');

// generic multi-page scraper
function generic(method, user, page, f, callback) {
  // console.log(user + ' - - - - Page:' + page + ' - - - - ' + f.length);
  var url = 'https://github.com/' + user + '/' + method + '?page=' + page;

  request(url, function (error, response, html) {
    if (!error && response.statusCode === 200) {

      var $ = cheerio.load(html);

      $('.follow-list-item').each(function () {
        f.push($(this).find('a').attr('href').replace("/", ""));
      });

      // check pagination has a "next" button indicating more people
      // borrowed from: http://stackoverflow.com/questions/6673777/
      var nextpage = $('.pagination a').filter(function () {
        return $(this).text() === "Next";
      });

      if (typeof nextpage !==  'undefined' && nextpage.length !== 0) {
        // e.g: https://github.com/andrew/following?page=3
        page = nextpage.attr('href').split("=")[1];
        generic(method, user, page, f, callback); // recursive
      } else {
        callback(null, f);
      }

    } else {
      callback(response.statusCode);
    }
  });
}

function followers(user, callback) {
  generic('followers', user, 1, [], callback);
}

function following(user, callback) {
  generic('following', user, 1, [], callback);
}

module.exports = {
  following: following,
  followers: followers
}

// following('andrew', function (err, f) {
//   console.log("Totall Following: " + f.length);
// });

// following('sabariz', function (err, f) {
//   console.log("Totall Following: " + f.length);
// });

// following('csjaba', function (err, f) {
//   console.log("Totall Following: " + f.length);
// });
