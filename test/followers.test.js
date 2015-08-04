var test      = require('tape');
var followers = require('../lib/switcher');

test('read list of followers for @iteles ', function(t){
  var username = 'iteles/followers';
	followers(username, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length > 10, '"followers": '+data.entries.length);
		t.ok(typeof data.next === 'undefined', username +' only has 1 page of followers');
		t.end();
	});
})

test('read list of followers for @pgte (multi-page)', function(t){
  var username = 'pgte/followers';
	followers(username, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length > 50, '"followers": '+data.entries.length);
		t.ok(data.next_page === 'https://github.com/pgte/followers?page=2', username +' multi-page followers');
    // crawl second page:
    followers(data.next_page, function(err2, data2){
      t.ok(data2.entries.length > 50, '"followers": '+data.entries.length);
      t.ok(data2.next_page === 'https://github.com/pgte/followers?page=3', username +' multi-page followers');
		  t.end();
    })
	});
})
