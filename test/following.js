/*jslint node: true */
"use strict";

var test = require('tape');
var scrape = require('../src/following.js');

// test for failure (user doesn't exist HTTP status = 404)
test('Non-existant user doesnt have a following page', function (assert) {
	var user = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	scrape.following(user, function (err, s) {
		assert.ok(err === 404, '- 404 unknown user @' + user + ' no following page');
		assert.end();
	});
});

test('Linus Torvals is not following anyone', function (assert) {
	var user = 'torvalds';
	scrape.following(user, function (err, s) {
		assert.ok(Object.keys(s).length === 0, '- @' + user + ' doesnt follow.');
		assert.end();
	});
});