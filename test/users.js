/*jslint node: true */
// "use strict";

var test  = require('tape');
var U = require('../src/users.js');
var db = require('../src/save.js');
var F = require('../src/follow.js');
var Chalk = require('chalk');

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

test('Integration test adds list of followers for know user to users', function (t) {
  var user = 'iteles';
  F.followers(user, function(e,f){
    U.addUsers(f, function(err, users) {
      t.true((users.indexOf(f[0]) > -1), "✓ " +f[0]  +" user added");
      t.ok((users.indexOf(f[1]) > -1), "✓ " +f[1] +" user added");
      users = F.tidyArray(users, u1);
      users = F.tidyArray(users, u2);
      db.saveUsers(users, function(e, d){
        t.end();
      });
    });
  })
});

var interval = 1; // set the interval for how often to crawl a user

// get next user to crawl from list of users
test('nextUser should work when supplied an undefined user', function(t) {
  var u; // undefined
  var u2 = 'xilonojim'
  var users = [u, u2];

  U.nextUser(users, interval, function(e, nu){
    console.log(Chalk.red('>> '+nu));
    console.log(Chalk.cyan(users));
    t.equal(nu, u2, Chalk.green("✓ " +nu +" is next user"));
    t.end();
  });
});

test('nextUser should return error when users.length < 1', function(t) {
  var users = [];
  U.nextUser(users, interval, function(e, nu){
    // console.log(Chalk.red('>> '+e));
    // console.log(Chalk.cyan(users));
    t.equal(e, 500, Chalk.green("✓ " +nu +" "));
    t.end();
  });
});

test('Works when interval is low', function(t) {
  var user = 'edwardcodes';
  db.save('nodecoder', {"hello":"world"}, function(e,d){
    // console.log('72 >> '+d);
    F.following(user, function (e, f) {
      U.nextUser(f, 1, function(e, nu) {
        // console.log('>> 74 >> ' +nu + " | "+user);
        t.true('nodecoder' === nu, "✓ nextUser is " +nu)
        U.nextUser(f, 5000, function(e, nu) {
          // console.log('>> 76 >> ' +nu + " | "+user);
          t.true('hyprstack' === nu, "✓ nextUser is hyprstack")
          db.erase('nodecoder', function(e,d){
            t.end();
          });
        });
      });
    });
  });
});

test('Works when interval is low - known static user edwardcodes', function(t) {
  var user = 'edwardcodes';
  db.save('nodecoder', {"hello":"world"}, function(e,d){
    F.following(user, function (e, f) {
      U.nextUser(f, 3000, function(e, nu) {
        // console.log('>> 91 >> ' +nu + " | "+user);
        t.true('hyprstack' === nu, "✓ nextUser is hyprstack")
        db.erase('nodecoder', function(e,d){
          t.end();
        });
      });
    });
  });
});

test('Works when interval is high', function(t) {
  db.erase('edwardcodes', function(e,d){
    //
  })
  var user = 'nodecoder';
  F.following(user, function (e, f) {
    U.nextUser(f, 10000000000, function(e, nu) {
      // console.log('>> 107 >> ' +nu + " | "+user);
      t.true('edwardcodes' === nu, "✓ nextUser is " +nu)
      t.end();
    });
  });
});
