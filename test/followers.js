/*jslint node: true */
"use strict";

var test = require('tape');
var F = require('../src/follow.js');


// test for failure (user doesn't exist HTTP status = 404)
test('Non-existant user doesnt have a following page', function (assert) {
	var user = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	F.followers(user, function (err, s) {
		assert.ok(err === 404, '- 404 unknown user @' + user + ' no following page');
		assert.end();
	});
});

test('@Zero has zero followers', function (assert) {
	var user = 'zero';
	F.followers(user, function (err, s) {
		assert.ok(s.length === 0, '- @' + user + ' doesnt follow.');
		assert.end();
	});
});

test('Alan has more than 51 (1 page of) followers', function (assert) {
	var user = 'alanshaw';
	F.followers(user, function (err, s) {
		assert.ok(s.length > 51, '- @' + user + ' has ' + s.length + ' followers');
		assert.end();
	});
});

// can't decide where to put this test...
var P = require('../src/profile.js');

test('Record when a user stops following', function (assert) {
	var user = 'hyprstack';
	P.profile(user, function(err, profile){
		F.followers(user, function(error, f) {
			// console.log(f);
			profile = F.updateUsers('followers', profile, f);
			// console.log(profile);
			// console.log(' - - - - - - - - - - ');
			console.log('Unfollow: '+f[0]);
			var removed = f[0];
			f = F.tidyArray(f[0], f)
			profile = F.updateUsers('followers', profile, f);
			// console.log(profile);
			assert.equal(profile.followers[removed].length, 2);
			assert.end();
		});

	})
});
