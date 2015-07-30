/*
var test = require('tape');
var scrape = require('../src/follow.js');

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
		assert.ok(s.length === 0, '- @' + user + ' doesnt follow.');
		assert.end();
	});
});

test('Chris is Following more than 51 (1 page of) people', function (assert) {
	var user = 'cwaring';
	scrape.following(user, function (err, s) {
		assert.ok(s.length > 51, '- @' + user + ' is Following ' + s.length + ' people');
		assert.end();
	});
});
*/
