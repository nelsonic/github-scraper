var test      = require('tape');
var followers = require('../lib/followers');

test('Scrape undefined profile (error test) ', function(t) {
	followers(null, function(err){
		t.ok(err, 400, 'Receive 400 Error when orgname is undefined');
		t.end();
	})
})

test('Scrape random (non-existent) profile (error test) ', function(t){
	var username = '' + Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	followers(username, function(err, data){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof data === 'undefined', '@param profile is undefined (as expected)');
		t.end();
	})
})

test('read list of followers for @iteles ', function(t){
  var username = 'iteles';
	followers(username, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.followers.length > 10, '"followers": '+data.followers.length);
		t.ok(typeof data.next === 'undefined', username +' only has 1 page of followers');
		t.end();
	});
})

test('read list of followers for @pgte (multi-page)', function(t){
  var username = 'pgte';
	followers(username, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.followers.length > 50, '"followers": '+data.followers.length);
		t.ok(data.next === 'https://github.com/pgte/followers?page=2', username +' multi-page followers');
		t.end();
	});
})
