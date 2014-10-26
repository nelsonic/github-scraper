var P = require('./profile.js');
var F = require('./follow.js');
var db = require('./save.js');

var user = 'alanshaw';

function crawlUser(user, callback) {
  P.profile(user, function (err, profile) {
    F.followers(user, function(e1, followers){
      profile = F.updateUsers('followers', profile, followers);
      F.following(user, function(e2, following){
        profile = F.updateUsers('following', profile, following);
        // console.log(profile);
        db.save(user, profile, function(err, data){
          // console.log(data);
          callback(err, profile);
        })
      })
    })
  });
}

module.exports = {
  crawlUser: crawlUser
}
