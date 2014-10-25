/*jslint node: true */
"use strict";

var test = require('tape');
var f = require('../src/follow.js');

// test for failure (user doesn't exist HTTP status = 404)
test('Non-existant user doesnt have a following page', function (assert) {
	var user = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	f.followers(user, function (err, s) {
		assert.ok(err === 404, '- 404 unknown user @' + user + ' no following page');
		assert.end();
	});
});

test('@Zero has zero followers', function (assert) {
	var user = 'zero';
	f.followers(user, function (err, s) {
		assert.ok(s.length === 0, '- @' + user + ' doesnt follow.');
		assert.end();
	});
});

test('Alan has more than 51 (1 page of) followers', function (assert) {
	var user = 'alanshaw';
	f.followers(user, function (err, s) {
		assert.ok(s.length > 51, '- @' + user + ' has ' + s.length + ' followers');
		assert.end();
	});
});

// update list of followers

test('Alan has more than 51 (1 page of) followers', function (assert) {
	var user = 'alanshaw';
	f.followers(user, function (err, s) {
		assert.ok(s.length > 51, '- @' + user + ' has ' + s.length + ' followers');
		assert.end();
	});
});

test('Alan has more than 51 (1 page of) followers', function (assert) {
	var user = 'alanshaw';
	f.updateGeneric(user, [], function (err, s) {
		// assert.ok(s.length > 51, '- @' + user + ' has ' + s.length + ' followers');
		assert.end();
	});
});
