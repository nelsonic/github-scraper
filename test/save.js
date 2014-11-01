/*jslint node: true */
"use strict";

var test = require('tape');
var P = require('../src/profile.js');
var db = require('../src/save.js');

// save a basic profile to disk
test('Save (and Open) basic profile to disk', function (assert) {
  var user = 'alanshaw';
  var profile = { "hello":"world" };
  db.save(user, profile, function(err, data){
    assert.equal(data, user+'.json saved', "✓ Record saved");
    db.open(user, function(err, data){
      if(err){
        console.log(' - - - - - - - - ');
        console.log(err)
        console.log(' - - - - - - - - ');
      }
      assert.deepEqual(JSON.parse(data), profile, "✓ Profile matches");
      assert.end();
    })
  })
});

// test failure to open a file that doesn't exist
test('Try opening a file that doesnt exist', function (assert) {
  var user = Math.floor(Math.random() * 1000000000000000); // rndm
  db.open(user, function(err, data) {
    assert.equal(err.errno, 34, "✓ " +user +" Not Found"); // file not found
    assert.end();
  });
});

// delete a record
test('Save (and Open) basic profile to disk', function (assert) {
  var user = Math.floor(Math.random() * 1000000000000000); // rndm
  var profile = { "hello":"world" };
  db.save(user, profile, function(err, data){
    assert.equal(data, user+'.json saved' ,"✓ User Created");
    db.erase(user, function(err, data){
      assert.equal(data, user+' deleted', "✓ User Deleted");
      // confirm it was deleted:
      db.open(user, function(err, data) {
        assert.equal(err.errno, 34, "✓ User Not Found"); // file not found
        assert.end();
      });
    });
  });
});

// open log file to extract json

// loop through existing list of followers

// confirm the user is in the array of current followers

// remove a random follower from followers array so there's a diff

// add a random follower so there's someone new
