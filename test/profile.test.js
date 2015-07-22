/*jslint node: true */
"use strict";

var test = require('tape');
var profile = require('../lib/profile');
var start = Date.now();

test('Scrape @nelsonic GitHub profile ', function(t){
	profile('nelsonic', function(err, profile){
		t.ok(profile.current > 500, 'Current Streak ' + profile.current +' is over 500 days!');
		t.end();
	})
})

test('Scrape undefined profile (error test) ', function(t){
	profile(null, function(err, profile){
		t.ok(err, 400, 'Receive 400 Error when username is undefined');
		t.end();
	})
})

test('Scrape random (non-existent) profile (error test) ', function(t){
	var user = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	profile(user, function(err, profile){
	  // console.log(err, profile);
	  // var end = Date.now();
	  // var time = end - start;
	  // console.log('       T: ' + time +' ms');
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof profile === 'undefined', '@param profile is undefined (as expected)');
		t.end();
	})
})
