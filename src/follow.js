var request = require('request');
var cheerio = require('cheerio');

// generic multi-page scraper
function followGeneric (method, user, page, f, callback) {
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
        followGeneric(method, user, page, f, callback); // recursive
      } else {
        callback(null, f);
      }

    } else {
      callback(response.statusCode);
    }
  });
}

function followers (user, callback) {
  followGeneric('followers', user, 1, [], callback);
}

function following (user, callback) {
  followGeneric('following', user, 1, [], callback);
}

var fsdb = require('./save.js'); // our fs opperations

function updateGeneric (user, arr, callback) {
  // open the existing file on disk
  fsdb.open(user, function(err, data){
    var profile = JSON.parse(data);
    // console.log(profile)
    callback(err, profile);
  })
  // if there's an error the user does not exist

}

module.exports = {
  following: following,
  followers: followers,
  updateGeneric: updateGeneric
}
