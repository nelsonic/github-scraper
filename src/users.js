var db = require('./save.js');
var F = require('./follow.js');
var chalk = require('chalk');

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
  if(!users || users.length < 1) {
    return callback(500, 'no users');
  }
  // console.log(users)
  // users = F.tidyArray(users);
  var d = new Date();
  var t = d.getMinutes() +':' +d.getSeconds()+':'+d.getMilliseconds();
  var u = users[0];
  // console.log(chalk.red(t) + chalk.green(' nextUser ') +chalk.cyan(u));
  if(typeof u === 'undefined'){
    users.splice(0, 1);
    return nextUser(users, interval, callback); // recurse
  } 
  // console.log(users.length + ' users >> next: '+u)
  db.lastUpdated(u, function(err, diff) {
    // console.log("Diff: "+diff +' > interval '+interval);
    if(err) {
      return callback(err, u);
    } else if(diff > interval) {
      callback(err, u);
    } else {
      // users = F.tidyArray(users, u);
      users.splice(0, 1);
      nextUser(users, interval, callback); // recurse
    }
  })
}

module.exports = {
  addUsers: addUsers,
  nextUser: nextUser
}