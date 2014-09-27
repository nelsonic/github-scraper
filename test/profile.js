/*jslint node: true */
"use strict";

var test = require('tape');
var scrape = require('../src/profile.js');

test('Basic Checks for a Known User @pgte', function (assert) {
	var user = 'pgte';
	scrape.profile(user, function (err, s) {
		// console.log(s);
		assert.ok(s.joined === '2009-01-20T10:54:20Z', '- @' + user + ' Joined Date 2009-01-20T10:54:20Z has not chaged');
		assert.ok(s.worksfor === 'YLD', '- @' + user + ' Works for YLD');
		assert.ok(s.email === 'i@pgte.me', '- @' + user + ' Email address is: i@pgte.me');
		assert.ok(s.url === 'http://www.metaduck.com', '- @' + user + ' Website URL is metaduck.com');
		assert.ok(s.location === 'Funchal, Portugal', '- @' + user + ' Based in Funchal, Portugal');
		assert.ok(s.followerscount > 470, '- @' + user + ' Has more than 400 followers');
		assert.ok(s.stared > 100, '- @' + user + ' Has starred more than 100 repos');
		assert.ok(s.followingcount > 50, '- @' + user + ' Is following more than 50 people');
		assert.ok(s.contribs > 365, '- @' + user + ' Has made at least 365 contributions to Open Source this year');
		assert.ok(s.longest > 6, '- @' + user + ' Has a decent contribution "streak"');		
		assert.end();
	});
});

// Zombie User should have no email, no followers or following
test('Checks for a Zombie (no activity) user @zero', function (assert) {
	var user = 'zero';
	scrape.profile(user, function (err, s) {
		// console.log(s);
		assert.ok(s.followerscount === 0, '- @' + user + ' Has no followers');
		assert.ok(s.stared === 0, '- @' + user + ' Has starred zero repos');
		assert.ok(s.followingcount === 0, '- @' + user + ' Is following nobody');
		assert.ok(s.contribs === 0, '- @' + user + ' Has made zero contributions to Open Source this year');
		assert.ok(s.email === '', '- User @' + user + ' Has no email address');
		assert.end();
	});
});

// test for failure (user doesn't exist HTTP status = 404)
test('Test for a non-existant user', function (assert) {
	var user = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	scrape.profile(user, function (err, s) {
		assert.ok(err === 404, '- 404 for unknown user @' + user);
		assert.end();
	});
});

test('Linus Torvals has thousands of followers (whats new?)', function (assert) {
	var user = 'torvalds';
	scrape.profile(user, function (err, s) {
		assert.ok(s.followerscount > 18000, '- User @' + user + ' has more than 18k followers!');
		assert.end();
	});
});