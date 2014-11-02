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
    if(diff > interval) {
      callback(err, u);
    } else {
      users = F.tidyArray(users, u);
      nextUser(users, interval, callback); // recurse
    }
  })
}

module.exports = {
  addUsers: addUsers,
  nextUser: nextUser
}
