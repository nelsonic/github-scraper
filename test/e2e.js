/*jslint node: true */
"use strict";

// uses all the other modules
var test = require('tape');
var db = require('../src/save.js');
var F = require('../src/follow.js');
var P = require('../src/profile.js');

// Full Workflow
// 1. Crawl a User's Profile on GitHub
// 2. Get their Followers & Following
// 3. Save that user's profile to DB
// 4. Retrieve Profile from DB
// 5. Remove a follower
// 6. Save to DB again
// 7. Read from DB & confirm follow count correct.
// Update a profile in "db" then read it back
test('Full Workflow', function (assert) {
  var user = 'iteles';
  // 1
  P.profile(user, function (err0, profile) {
    // 2
    F.followers(user, function(err1, followers){
      profile = F.updateUsers('followers', profile, followers);
      F.following(user, function(err2, following){
        profile = F.updateUsers('following', profile, following);
        // console.log(profile);
        // 3
        db.save(user, profile, function(err3, log) {
          // 4
          db.open(user, function(err4, data) {
            // console.log(data);
            var profile = JSON.parse(data);
            // console.log(profile)
            var f = Object.keys(profile['followers']);
            // 5
            var removed = f[0];
            f = F.tidyArray(f[0], f)
            profile = F.updateUsers('followers', profile, f);
            F.updateUsers('following', profile, following);
            // 6
            db.save(user, profile, function(err5, log) {
              // 7
              db.open(user, function(err6, data) {
                var profile = JSON.parse(data);
                console.log(profile.followers[removed]);
                assert.equal(profile.followers[removed].length, 2, ' unfollowed');
                // console.log(err0, err1, err2, err3, err4, err5);
                assert.end();
              });
            }); // 6
            // assert.equal(, 34); // file not found
          });
        })
      })
    })
  });
});

var C = require('../src/index.js');
test('Test Complete Crawl (and save to db)', function (assert) {
  var user = 'joaquimserafim';
  C.crawlUser(user, function (err, profile) {
    assert.ok(err === null, ' no error ' + user);
    var followers = Object.keys(profile.followers);
    assert.true(followers.length > 20, user + ' has more than 20 followers');
    assert.end();
  });
});


test('Delete record to ensure dberr', function (assert) {
  var user = 'zero';
  db.erase(user, function(err){
    C.crawlUser(user, function (err, profile) {
      assert.ok(err === null, ' no error ' + user);
      assert.end();
    });
  })
});
// delete user after checking to ensure we throw dberr
