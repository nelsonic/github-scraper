var test      = require('tape');
var following = require('../lib/switcher');

test('read list of following for @iteles ', function(t){
  var url = 'iteles/following';
	following(url, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length > 10, '"following": '+data.entries.length);
		t.ok(typeof data.next === 'undefined', url +' only has 1 page of following');
		t.end();
	});
})

test('read list of following for @Marak (multi-page)', function(t){
  var url = 'Marak/following';
	following(url, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length > 50, '"following": '+data.entries.length);
		t.ok(data.next_page === 'https://github.com/'+url +'?page=2', url +' multi-page following');
    // crawl second page:
    following(data.next_page, function(err2, data2){
      t.ok(data2.entries.length > 50, '"following": '+data.entries.length);
      t.ok(data2.next_page === 'https://github.com/'+url +'?page=3', url +' multi-page following');
		  t.end();
    })
	});
})
