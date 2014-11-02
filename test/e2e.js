/*jslint node: true */
"use strict";

// uses all the other modules
var test = require('tape');
var db = require('../src/save.js');
var F = require('../src/follow.js');
// var P = require('../src/profile.js');
var C = require('../src/index.js');

test('E2E with including unfollowing, updating & deleting', function (t) {
  var user = 'nodecoder';
  C.crawlUser(user, function(err1, profile){
    // manually remove a follower:
    var f = Object.keys(profile['followers']);
    var removed = f[0];
    f = F.tidyArray(f[0], f)
    profile = F.updateUsers('followers', profile, f);

    // maunally update, read & delete the record
    db.save(user, profile, function(err2, log) {
      db.open(user, function(err3, data) {
        var profile = JSON.parse(data);
        t.equal(profile.followers[removed].length, 2, "✓ "+removed +' unfollowed');
        // delete user after checking to ensure we throw dberr
        db.erase(user, function(err4, data){
          t.end();
        }); // end erase - ensures we exercise all lines
      }); // end open
    }); // end save
  })
});


test('Test Complete Crawl (and save to db)', function (assert) {
  var user = 'joaquimserafim';
  C.crawlUser(user, function (err, profile) {
    assert.ok(err === null, '✓  no error ' + user);
    var followers = Object.keys(profile.followers);
    assert.true(followers.length > 20, "✓ " +user + ' has more than 20 followers');
    assert.end();
  });
});

/*
test('Delete record to ensure dberr', function (assert) {
  var user = 'zero';
  db.erase(user, function(err){
    C.crawlUser(user, function (err, profile) {
      assert.ok(err === null, ' no error ' + user);
      assert.end();
    });
  })
});
*/
