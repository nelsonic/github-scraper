var request = require('request');
var cheerio = require('cheerio');

// basic info
function following(user, page, f, callback) {
  // console.log(' - - - - Page:' + page +' - - - - '+f.length);
  var url = 'https://github.com/' + user + '/following?page=' + page;

  request(url, function (error, response, html) {
    if (!error && response.statusCode === 200) {

      var $ = cheerio.load(html);

      $('.follow-list-item').each(function () {
        f.push($(this).find('a').attr('href').replace("/", ""));
      });

      // check pagination has a "next" button indicating more people
      // var next = $('.pagination a:last-child').attr('href');
      // borrowed from: http://stackoverflow.com/questions/6673777/
      var nextpage = $('.pagination a').filter(function () { return $(this).text() === "Next"; });

      if (typeof nextpage !==  'undefined' && nextpage.length !== 0) {
        // e.g: https://github.com/andrew/following?page=3
        page = nextpage.attr('href').split("=")[1];
        following(user, page, f, callback); // recursive
      } else {
        callback(null, f);
      }

    } else {
      callback(response.statusCode);
    }
  });
}

module.exports = {
  following: following
}

// following('andrew', 1, [], function (err, f) {
//   console.log("Totall Followers: " + f.length);
// });

