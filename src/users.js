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
      // console.log(u);``
      users.push(u);
    });
    users = F.tidyArray(users, 'zero');
    db.saveUsers(users, function(err) {
      callback(err, users);
    });
  });
}


/*
function nextUser(){
  var u = users[jobs+1];
  if(typeof u === 'undefined' || u.length === 0 || u === undefined) {
    console.log( ' - - - - - - '+u +' - - - - - - -');
    F.tidyArray(u);
    nextUser();
  } else {
    return u;
  }

}
*/

module.exports = {
  addUsers: addUsers
}
