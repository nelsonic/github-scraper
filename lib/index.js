var P = require('./profile.js');
var F = require('./follow.js');
var db = require('./save.js');
var U = require('./users.js')

function log(err, data) {
  // console.log(err, data);
}

// E2E Function
function crawlUser(user, callback) {
  var ep = false; // existing profile
  // Yes, this is not best-practice asynchronous JS but its one fewer
  // nested callback and is ALWAYS faster than crawling a profile page
  db.open(user, function(dberr, data) {
    if(dberr){
      // callback(dberr);
      // console.log(dberr); // log "New User!"
      console.log(">> NEW USER:", user);
    } else {
      ep = JSON.parse(data);
    }
  });

  P.profile(user, function (err, profile) {
    if(err || !profile) {
      return callback(err, profile);
    }
    var p = ep ? ep : profile;
    F.followers(user, function(e1, followers) {
      profile = F.updateUsers('followers', p, followers);
      U.addUsers(followers, log);
      F.following(user, function(e2, following) {
        U.addUsers(following, log);
        profile = F.updateUsers('following', p, following);
        // console.log(profile);
        db.save(user, profile, function(e3, data) {
          callback(err, profile);
        })
      })
    })
  });
}

module.exports = {
  crawlUser: crawlUser
}
