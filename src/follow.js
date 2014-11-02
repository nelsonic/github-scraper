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

// a cople of utility functions
function tidyArray(arr, elem) {
  // remove dupes from list of users
  arr = arr.filter(function (v, i, a) {
    return a.indexOf (v) === i;
  }); // http://stackoverflow.com/a/14821032/1148249

  // remove undefined/blank http://stackoverflow.com/a/281393/1148249
  arr = arr.filter(function(e) { return e; });

  // remove the current user we are checking from list of users
  var index = arr.indexOf(elem);
  if(index > -1){
    arr.splice(index, 1); // http://stackoverflow.com/a/3954451/1148249
  }
  return arr;
}

// generic function re-used below
function update(method, profile, existing, latest) {
  latest.map(function(u) {
    if((existing.indexOf(u) === -1)) {
      if(typeof profile[method][u] === 'undefined') {
        profile[method][u] = [];
      }
      profile[method][u].push(new Date().getTime());
    }
  });
  return profile;
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
    profile = update(method, profile, latest, existing); // yes switched!
  } else { // profile does not currently have follower/following object
    existing = [];
    profile[method] = {};
    latest.map(function(u) {
      profile[method][u] = [];
    });
  }
  return update(method, profile, existing, latest);
}

module.exports = {
  following: following,
  followers: followers,
  updateUsers: updateUsers,
  tidyArray: tidyArray,
  update: update
}
