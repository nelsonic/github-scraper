var test      = require('tape');
var followers = require('../lib/switcher');

test('read list of followers for @hangouts (single page of followers) ', function (t) {
  const username = "hangouts";
  const path = username + '?tab=followers';
	followers(path, function(err, data) {
    t.equal(data.type, 'followers', username + ' data.type: ' + data.type);
    // console.log(data.entries.length)
    // console.log(data)
    t.ok(data.entries.length < 20, '@' + username + ' has ' + data.entries.length + ' followers');
    const people = data.entries.map(e => e.username);
	  t.ok(people.indexOf('giko') >-1, 'giko follows @' + username)
		t.ok(typeof data.next_page === 'string',  '@' + username +' only has 1 page of followers');
		t.end();
	});
})

test('read list of followers for @iteles (multi-page)', function(t){
  const username = "iteles";
  const path = username + '?tab=followers';
  followers(path, function(err, data) {
    // console.log(data.entries.length)
    // console.log(data)
    t.ok(data.entries.length === 50, '"followers": ' + data.entries.length + ' on page 1');
    // console.log(' - - - - - - - - - - - - - data.next_page:');
    // console.log(data.next_page);
    t.ok(data.next_page.indexOf('page=2&tab=followers') > -1,
    username +' multi-page followers');
    // crawl second page of followers to confirm next_page is working:
    followers(data.next_page, function (err2, data2) {
   
      // console.log(err2, data2);
      t.ok(data2.entries.length === 50, '"followers": ' + data.entries.length);
      t.ok(data2.next_page.indexOf('page=3&tab=followers') > -1,
      username +' multi-page followers');
      t.end();
    });
  });
});

// see: github.com/nelsonic/github-scraper/issues/60
test.skip('Regression Test for issue #60', function(t){
  var username = 'hangouts?tab=followers';
	followers(username, function(err, data) {
    // console.log(username + ' has followers: ' + data.entries);
		t.ok(data.entries.length > 1, '"followers": '+data.entries.length);
	  t.end();
	});
})
