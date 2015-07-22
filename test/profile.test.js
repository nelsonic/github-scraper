/*jslint node: true */
"use strict";

var test = require('tape');
// removed
var Profile = require('../lib/profile');
var start = Date.now();
test('Scrape @nelsonic GitHub profile ', function(t){
	Profile('nelsonic', function(err, profile){
	  console.log(profile);
	  var end = Date.now();
	  var time = end - start;
	  console.log('       T: ' + time +' ms');
		t.ok(profile.current > 500, 'Current Streak ' + profile.current +' is over 500 days!');
		t.end();
	})
})
