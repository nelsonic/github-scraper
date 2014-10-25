/*jslint node: true */
"use strict";

var test = require('tape');
var scrape = require('../src/profile.js');
var fsdb = require('../src/save.js');

// save a basic profile to disk
test('Save (and Open) basic profile to disk', function (assert) {
  var user = 'alanshaw';
  scrape.profile(user, function (err, profile) {
    fsdb.save(user, profile, function(err, data){
      assert.equal(data, user+'.log saved');
      fsdb.open(user, function(err, data){
        if(err){
          console.log(' - - - - - - - - ');
          console.log(err)
          console.log(' - - - - - - - - ');
        }
        assert.deepEqual(JSON.parse(data), profile);
        assert.end();
      })
    })
  });
});

// test failure to open a file that doesn't exist
test('Save (and Open) basic profile to disk', function (assert) {
  var user = Math.floor(Math.random() * 1000000000000000); // rndm
  fsdb.open(user, function(err, data) {
    assert.equal(err.errno, 34); // file not found
    assert.end();
  })
});

// open log file to extract json

// loop through existing list of followers

// confirm the user is in the array of current followers

// remove a random follower from followers array so there's a diff

// add a random follower so there's someone new
