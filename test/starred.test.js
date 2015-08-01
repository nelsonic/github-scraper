var test      = require('tape');
var starred = require('../lib/starred');

test('Scrape undefined profile (error test) ', function(t) {
	starred(null, function(err){
		t.ok(err, 400, 'Receive 400 Error when orgname is undefined');
		t.end();
	})
})

test('Scrape random (non-existent) profile (error test) ', function(t){
	var username = '' + Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	starred(username, function(err, data){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof data === 'undefined', '@param profile is undefined (as expected)');
		t.end();
	})
})

test('read list of starred repos for single page @lukebond (who never stars anything!) ', function(t){
  var username = 'lukebond';
	starred(username, function(err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length > 0, '@'+username +' has only "starred": '+data.entries.length +' repos');
		t.ok(typeof data.next === 'undefined', username +' has no "next page" (because he does not star anything!)');
		t.end();
	});
})

test('read list of starred repos for single page @iteles (multi-page) ', function(t){
  var username = 'iteles';
	starred(username, function(err, data) {
		// console.log(data)
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length === 30, '@'+username +' has only "starred": '+data.entries.length +' repos (first page)');
		t.ok(data.next.indexOf('page=2') > -1, '@'+username +' has multiple pages of starred repos');
		starred(data.next, function(err2, data2){
			console.log(data2.next)
			t.ok(data2.next.indexOf('page=3') > -1, '@'+username +' has multiple pages of starred repos');
			t.end();
		})
	});
})

// test('read list of stars for nelsonic/practical-js-tdd (multi-page)', function(t){
//   var username = 'nelsonic/practical-js-tdd';
// 	stars(username, function(err, data) {
// 		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
// 		t.ok(data.stars.length > 50, '"stars": '+data.stars.length);
// 		t.ok(data.next === 'https://github.com/'+username +'/stargazers?page=2', username +' multi-page stars');
//     // crawl second page:
//     stars(data.next, function(err2, data2){
//       t.ok(data2.stars.length > 50, '"stars": '+data.stars.length);
//       t.ok(data2.next === 'https://github.com/'+username +'/stargazers?page=3', username +' multi-page stars');
// 		  t.end();
//     })
// 	});
// })
