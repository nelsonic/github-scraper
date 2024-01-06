var test      = require('tape');
var following = require('../lib/switcher');

test('read list of following for @torvalds (zero people!)', function(t){
  var url = 'torvalds?tab=following';
	following(url, function (err, data) {
    t.equal(data.type, 'following', 'data.type is: ' + data.type);
		t.ok(data.entries.length === 0, '"following": '+data.entries.length);
		t.ok(typeof data.next_page === 'string', url
      +' has no "next_page" because he is not following anyone!');
		t.end();
	});
})

test('read list of following for @Marak (multi-page)', function(t){
  var url = 'Marak?tab=following';
	following(url, function (err, data) {
    t.equal(data.type, 'following', 'data.type is: ' + data.type);
		t.ok(data.entries.length === 50, '"following": '+data.entries.length);
    t.ok(data.next_page.indexOf('page=2') > -1,
      url +' multi-page followers');
    // crawl second page:
    following(data.next_page, function (err2, data2) {
      t.ok(data2.entries.length > 20, '"following": '+data.entries.length);
		  t.end();
    })
	});
})
