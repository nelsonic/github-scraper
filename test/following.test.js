var test      = require('tape');
var following = require('../lib/following');

test('Scrape undefined profile (error test) ', function(t) {
	following(null, function(err){
		t.ok(err, 400, 'Receive 400 Error when orgname is undefined');
		t.end();
	})
})

test('Scrape random (non-existent) profile (error test) ', function(t){
	var username = '' + Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	following(username, function(err, data){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof data === 'undefined', '@param profile is undefined (as expected)');
		t.end();
	})
})

test('read list of following for @iteles ', function(t){
  var username = 'iteles';
	following(username, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.following.length > 10, '"following": '+data.following.length);
		t.ok(typeof data.next === 'undefined', username +' only has 1 page of following');
		t.end();
	});
})

test('read list of following for @Marak (multi-page)', function(t){
  var username = 'Marak';
	following(username, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.following.length > 50, '"following": '+data.following.length);
		t.ok(data.next === 'https://github.com/'+username +'/following?page=2', username +' multi-page following');
    // crawl second page:
    following(data.next, function(err2, data2){
      t.ok(data2.following.length > 50, '"following": '+data.following.length);
      t.ok(data2.next === 'https://github.com/'+username +'/following?page=3', username +' multi-page following');
		  t.end();
    })
	});
})
