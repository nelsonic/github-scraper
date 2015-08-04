var test      = require('tape');
var starred = require('../lib/switcher');

test('read list of starred repos for single page @lukebond (who never stars anything!) ', function(t){
  var username = 'stars/lukebond';
	starred(username, function(err, data) {
		// console.log(data);
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length < 10, '@'+username +' has only "starred": '+data.entries.length +' repos');
		t.ok(typeof data.next_page === 'undefined', username +' has no "next page" (because he does not star anything!)');
		t.end();
	});
})

test('read list of starred repos for single page @iteles (multi-page) ', function(t){
  var username = 'stars/iteles';
	starred(username, function(err, data) {
		// console.log(data)
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length === 30, '@'+username +' has only "starred": '+data.entries.length +' repos (first page)');
		t.ok(data.next_page.indexOf('page=2') > -1, '@'+username +' has multiple pages of starred repos');
		starred(data.next_page, function(err2, data2){
			console.log(data2.next_page)
			t.ok(data2.next_page.indexOf('page=3') > -1, '@'+username +' has multiple pages of starred repos');
			t.end();
		})
	});
})
