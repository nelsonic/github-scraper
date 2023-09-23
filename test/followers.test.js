var test      = require('tape');
var followers = require('../lib/switcher');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";

test(file + 'read list of followers for @jupiter (single page of followers) ', function (t) {
  var username = 'jupiter?tab=followers';
	followers(username, function(err, data) {
    if (err) {
      console.error("Error:", err);
      t.fail("Error while getting follower data");
      t.end();
      return;
    }
    t.equal(data.type, 'followers', username + ' data.type: ' + data.type);
    t.ok(data.entries.length > 10, '@' + username + ' has ' + data.entries.length + ' followers');
    const people = data.entries.map(e => e.username);
	  t.ok(people.indexOf('nelsonic') >-1, 'Nelson in ' + username)
		t.ok(typeof data.next_page === 'undefined',  '@' + username +' only has 1 page of followers');
		t.end();
	});
})

test(file + 'read list of followers for @iteles (multi-page)', function(t){
  var username = 'iteles?tab=followers';
  followers(username, function(err, data) {
    if (err) {
      console.error("Error:", err);
      t.fail("Error while getting follower data");
      t.end();
      return;
    }
    const pageMaxFollowerCount = 50;
    t.equal(data.entries.length, pageMaxFollowerCount, `followers: ${data.entries.length} on page 1(expected ${pageMaxFollowerCount})`);
    // console.log(' - - - - - - - - - - - - - data.next_page:');
    // console.log(data.next_page);
    t.ok(data.next_page.indexOf('?page=2') > -1, `Expected second page url, found ${data.next_page}`);
    // crawl second page of followers to confirm next_page is working:
    followers(data.next_page, function (err2, data2) {
      // console.log(err2, data2);
      t.equal(data2.entries.length, pageMaxFollowerCount, `followers: ${data2.entries.length} on page 1(expected ${pageMaxFollowerCount})`);
      t.ok(data2.next_page.indexOf('?page=3') > -1, `Expected third page url, found ${data2.next_page}`);
      t.end();
    });
  });
});

// see: https://github.com/nelsonic/github-scraper/issues/60
test(file + 'Regression Test for issue #60', function(t){
  var username = 'hangouts?tab=followers';
	followers(username, function(err, data) {
    if (err) {
      console.error("Error:", err);
      t.fail("Error while getting follower data");
      t.end();
      return;
    }
    // console.log(username + ' has followers: ' + data.entries);
		t.ok(data.entries.length > 1, '"followers": '+data.entries.length);
	  t.end();
	});
})
