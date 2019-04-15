var test      = require('tape');
var followers = require('../lib/switcher');

test('read list of followers for @jupiter (single page of followers) ', function (t) {
  var username = 'jupiter/followers';
	followers(username, function(err, data) {
    t.equal(data.type, 'followers', username + ' data.type: ' + data.type);
    t.ok(data.entries.length > 10, '@' + username + ' has ' + data.entries.length + ' followers');
    const people = data.entries.map(e => e.username);
	  t.ok(people.indexOf('nelsonic') >-1, 'Nelson in ' + username)
		t.ok(typeof data.next_page === 'undefined',  '@' + username +' only has 1 page of followers');
		t.end();
	});
})

test('read list of followers for @iteles (multi-page)', function(t){
  var username = 'iteles/followers';
  followers(username, function(err, data) {
    t.ok(data.entries.length > 50, '"followers": '+data.entries.length + ' on page 1');
    // console.log(' - - - - - - - - - - - - - data.next_page:');
    // console.log(data.next_page);
    t.ok(data.next_page.indexOf('iteles/followers?after=') > -1,
    username +' multi-page followers');
    // crawl second page of followers to confirm next_page is working:
    followers(data.next_page, function (err2, data2) {
      // console.log(err2, data2);
      t.ok(data2.entries.length > 50, '"followers": '+data.entries.length);
      t.ok(data.next_page.indexOf('iteles/followers?after=') > -1,
      username +' multi-page followers');
      t.end();
    });
  });
});

// see: https://github.com/nelsonic/github-scraper/issues/60
test('Regression Test for issue #60', function(t){
  var username = 'hangouts/followers';
	followers(username, function(err, data) {
    // console.log(username + ' has followers: ' + data.entries);
		t.ok(data.entries.length > 1, '"followers": '+data.entries.length);
	  t.end();
	});
})
