/*
var test = require('tape');
var db = require('../src/save.js');

// save a basic profile to disk
test('Save (and Open) basic profile to disk', function (t) {
  var user = 'alanshaw';
  var profile = { "hello":"world" };
  db.save(user, profile, function(err, data){
    t.equal(data, user+'.json saved', "✓ Record saved");
    db.open(user, function(err, data){
      if(err){
        console.log(' - - - - - - - - ');
        console.log(err)
        console.log(' - - - - - - - - ');
      }
      t.deepEqual(JSON.parse(data), profile, "✓ Profile matches");
      t.end();
    })
  })
});

// test failure to open a file that doesn't exist
test('Try opening a file that doesnt exist', function (t) {
  var user = Math.floor(Math.random() * 1000000000000000); // rndm
  db.open(user, function(err, data) {
    t.equal(err.errno, -2, "✓ " +user +" Not Found"); // file not found
    t.end();
  });
});

// delete a record
test('(Soft) Delete a record', function (t) {
  var user = 'zero';
  var profile = { "hello":"world" };
  db.save(user, profile, function(err, data){
    t.equal(data, user+'.json saved' ,"✓ User Created");
    db.erase(user, function(err, data){
      t.equal(data, user+' deleted', "✓ User Deleted");
      // confirm it was deleted:
      db.open(user, function(err, data) {
        t.equal(err.errno, -2, "✓ User Not Found"); // file not found
        t.end();
      });
    });
  });
});

// check last mod date on file:
test('lastUpdated - Known file', function (t) {
  db.lastUpdated('__zero', function(err, diff){
    // console.log('Last Crawled: '+Math.floor(diff/(60*60*1000)) +' Hours ago' );
    t.true(diff > 0, "✓ Last modified " +diff +" ms ago");
    t.end();
  });
});

// epect an error when file does not exist:
test('Unknown file should return error', function (t) {
  var user = Math.floor(Math.random() * 1000000000000000); // rndm
  db.lastUpdated(user, function(err, diff){
    t.equal(err.errno, -2, "✓ Record does not exist"); // file not found
    t.end();
  });
});

// save users
test('Save & retrieve list of users', function (t) {
  var users = ['hello', 'world'];
  db.saveUsers(users, function(err, data) {
    t.equal(err, null, "✓ Users saved"); // file saved
    db.open('users', function(err, data) {
      t.equal(err, null, "✓ Users retrieved"); // file found
      // console.log(data.split('\n'));
      t.deepEqual(data.split('\n'), users,  "✓ saveUsers");
      t.end();
    });
  });
});

/*

// if the difference is bigger than 1 day crawl again.
if(diff > 24 * 60 * 60 * 1000) {

} else {

}

*/

// open log file to extract json

// loop through existing list of followers

// confirm the user is in the array of current followers

// remove a random follower from followers array so there's a diff

// add a random follower so there's someone new
