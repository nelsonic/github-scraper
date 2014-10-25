/*jslint node: true */
"use strict";

var test = require('tape');
var scrape = require('../src/profile.js');
var save = require('../src/save.js');

// save a basic profile to disk
test('Save basic profile to disk', function (assert) {
  var user = 'alanshaw';
  scrape.profile(user, function (err, profile) {
    save.save(user, profile, function(err, data){
      assert.equal(data, user+'.log saved');
      save.open(user, function(err, data){
        assert.deepEqual(JSON.parse(data), profile);
        assert.end();
      })
    })
  });
});


// open log file to extract json

// loop through existing list of followers

// confirm the user is in the array of current followers

// remove a random follower from followers array so there's a diff

// add a random follower so there's someone new
