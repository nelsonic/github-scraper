var db = require('./save.js');
var F = require('./follow.js');

// add users from list of followers/following
function addUsers(list, callback) {
  db.open('users', function(err, data) {
    if(err) {
      return callback(err, list);
    }
    var users = data.split('\n');
    list.map(function(u){
      users.push(u);
    });
    users = F.tidyArray(users, 'zero');
    db.saveUsers(users, function(err) {
      callback(err, users);
    });
  });
}

// from the list of users return the next
function nextUser(users, interval, callback) {
  // if(!users || users.length < 1);
  users = F.tidyArray(users);
  var u = users[0];
  db.lastUpdated(u, function(err, diff){
    if(err) {
      return callback(err, u);
    }
    console.log(' - - - - - - - - - - - - - - - - > ' +diff +' > ' + interval)
    if(diff > interval) {
      callback(err, u);
    } else {
      users = F.tidyArray(users, u);
      nextUser(users, interval, callback); // recurse
    }
  })
  // if(typeof u === 'undefined' || u.length === 0 || u === undefined) {
  //   console.log( ' - - - - - - '+u +' - - - - - - -');
  //   F.tidyArray(users, u);
  //   nextUser(users);
  // } else
  // return u;
}

var interval = 24 * 60 * 60 * 1000;

F.following('nodecoder', function (e, f) {
  nextUser(f, interval, function(e, u) {
    console.log(u);
  });
});

module.exports = {
  addUsers: addUsers,
  nextUser: nextUser
}
