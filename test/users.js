/*jslint node: true */
"use strict";

var test  = require('tape');
var U = require('../src/users.js');
var db = require('../src/save.js');
var F = require('../src/follow.js');

var u1 = 'u' + Math.floor(Math.random() * 1000000000000000); // rndm
var u2 = 'u' + Math.floor(Math.random() * 1000000000000000); // rndm
var newusers = [u1, u2];

// list of users doesnt exist:
test('Dont fail when users.json is not present', function (t) {
  db.erase('users', function(err){
    U.addUsers(newusers, function(err, users) {
      t.equal(err.errno, 34, "✓ users.json does not exist"); // file not found
      t.true((users.indexOf(u2) > -1), "✓ New user added");
      users = F.tidyArray(users, u1);
      users = F.tidyArray(users, u2);
      db.saveUsers(users, function(e, d){
        t.end();
      });
    });
  });
});

// add list of followers/following to list of users
test('Add an array of users to existing list of users', function (t) {
  U.addUsers(newusers, function(err, users) {
    t.true((users.indexOf(u2) > -1), "✓ New user added");
    t.ok((users.indexOf(u2) > -1), "✓ New user added");
    users = F.tidyArray(users, u1);
    users = F.tidyArray(users, u2);
    db.saveUsers(users, function(e, d){
      t.end();
    });
  });
});
