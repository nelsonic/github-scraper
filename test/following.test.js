var test      = require('tape');
var following = require('../lib/switcher');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";

test(file + 'read list of following for @torvalds (zero people!)', function(t){
  var url = 'torvalds?tab=following';
	following(url, function (err, data) {
    if (err) {
      console.error("Error:", err);
      t.fail("Error while getting follower data");
      t.end();
      return;
    }
    t.equal(data.type, 'following', 'data.type is: ' + data.type);
		t.ok(data.entries.length === 0, '"following": '+data.entries.length);
		t.ok(typeof data.next_page === 'undefined', url
      +' has no "next_page" because he is not following anyone!');
		t.end();
	});
})

test(file + 'read list of following for @Marak (multi-page)', function(t){
  var url = 'Marak?tab=following';
	following(url, function (err, data) {
    if (err) {
      console.error("Error:", err);
      t.fail("Error while getting follower data");
      t.end();
      return;
    }
    t.equal(data.type, 'following', 'data.type is: ' + data.type);
    const pageMaxFollowingCount = 50;
		t.ok(data.entries.length === pageMaxFollowingCount, `following: ${data.entries.length}(Expected ${pageMaxFollowingCount})`);
    t.ok(data.next_page.indexOf('?page=2') > -1,
      url +' multi-page followers');
    // crawl second page:
    following(data.next_page, function (err2, data2) {
      t.ok(data2.entries.length === pageMaxFollowingCount, `following: ${data2.entries.length}(Expected ${pageMaxFollowingCount})`);
      t.ok(data2.next_page.indexOf('?page=3') > -1,
        url +' multi-page followers');
		  t.end();
    })
	});
})
