var test      = require('tape');
var followers = require('../lib/switcher');

test.skip('read list of followers for @jupiter (single page of followers) ', function (t) {
  var username = 'jupiter';
	followers(username + '/followers', function(err, data) {
    // console.log(data);
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length > 10, '@' + username + ' has ' + data.entries.length + ' followers');
		t.ok(typeof data.next_page === 'undefined',  '@' + username +' only has 1 page of followers');
		t.end();
	});
})

test.skip('read list of followers for @iteles (multi-page)', function(t){
  var username = 'iteles/followers';
	followers(username, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length > 50, '"followers": '+data.entries.length + ' on page 1');
		t.ok(data.next_page === 'https://github.com/iteles/followers?page=2', username +' multi-page followers');
    // crawl second page:
    followers(data.next_page, function(err2, data2){
      t.ok(data2.entries.length > 50, '"followers": '+data.entries.length);
      t.ok(data2.next_page === 'https://github.com/iteles/followers?page=3', username +' multi-page followers');
		  t.end();
    })
	});
})

// see: https://github.com/nelsonic/github-scraper/issues/60
test.skip('Regression Test for issue #60', function(t){
  var username = 'hangouts/followers';
	followers(username, function(err, data) {
    console.log(username + ' has followers: ' + data.entries);
		t.ok(data.entries.length > 1, '"followers": '+data.entries.length);
	  t.end();
	});
})
