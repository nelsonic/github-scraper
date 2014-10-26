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

var db = require('./save.js'); // our fs opperations


function tidyArray(elem, arr) {
  var log = ' --> removing ' + elem + ' | Before: ' + arr.length
  // remove dupes from list of users
  arr = arr.filter(function (v, i, a) {
    return a.indexOf (v) === i;
  }); // http://stackoverflow.com/a/14821032/1148249

  // remove the current user we are checking from list of users
  var index = arr.indexOf(elem);
  arr.splice(index, 1); // http://stackoverflow.com/a/3954451/1148249

  log = log + ' | After: ' + arr.length;
  console.log(log);
  return arr;
}

/**
 * @method can be 'followers' or 'following'
 * @profile is a profile object that may or may not have
 *   a followers / following object listing people
 * @latest is the list of people we *just* scraped
 */
function updateUsers(method, profile, latest) {
  var existing;
  if(profile.hasOwnProperty(method)){
    existing = Object.keys(profile[method]);
    // update people who/we have stopped following
      existing.map(function(u) {
        if((latest.indexOf(u) === -1)) {
          profile[method][u].push(new Date().getTime());
        }
      });

  } else { // profile does not currently have follower/following object
    existing = [];
    profile[method] = {};
    latest.map(function(u) {
      profile[method][u] = [];
    });
  }
  // insert new follows
    latest.map(function(u) {
      if((existing.indexOf(u) === -1)) {
        profile[method][u].push(new Date().getTime());
      }
    });

  return profile;
}

// example:
// followers('hyprstack', function(err, f) {
//   if(!err && f.length > 0) {
//     delete f[0];
//     var latest = ['torvalds', 'dhh'].concat(f);
//     var profile = { followers:{}, following:{} }
//     profile = updateUsers('following', profile, latest);
//     console.log(profile);
//     console.log(' - - - - - - - - - - ');
//     console.log('Unfollow: '+latest[0]);
//     latest = tidyArray(latest[0], latest)
//     // delete latest[0]
//     profile = updateUsers('following', profile, latest);
//     console.log(profile);
//   }
// });




module.exports = {
  following: following,
  followers: followers,
  updateUsers: updateUsers,
  tidyArray: tidyArray
}
