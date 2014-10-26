var P = require('./src/profile.js');
var F = require('./src/follow.js');
var db = require('./src/save.js');

var user = 'alanshaw';

// db.open(user, function(dberr, data){
//
//   var profile = JSON.parse(data);
// })
P.profile(user, function (err, profile) {
  if(err){
    console.log(' - - - - - - - - - - - Error:');
    console.log(err);
    console.log(' - - - - - - - - - - - \n');
  }

  F.followers(user, function(e1, followers){
    profile = F.updateUsers('followers', profile, followers);
    F.following(user, function(e2, following){
      profile = F.updateUsers('following', profile, following);
      console.log(profile);
      db.save(user, profile, function(err, data){
        console.log(data);
      })
    })
  })
});
