var test      = require('tape');
var people = require('../lib/people');

test('Scrape undefined profile (error test) ', function(t) {
	people(null, function(err){
		t.ok(err, 400, 'Receive 400 Error when orgname is undefined');
		t.end();
	})
})

test('Scrape random (non-existent) profile (error test) ', function(t){
	var org = '' + Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	people(org, function(err, data){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof data === 'undefined', '@param profile is undefined (as expected)');
		t.end();
	})
})

test('Scrape org with single page of people', function(t){
	var org = '/tableflip'
	people(org, function(err, data){
		console.log(data);
		t.ok(data.entries.length > 5, 'There are '+data.entries.length +' people in '+org);
		t.end();
	})
})

test('Scrape org with multiple pages of people', function(t){
	var org = '/github'
	people(org, function(err, data){
		console.log(data.next);
		t.ok(data.entries.length > 20, 'There are '+data.entries.length +' people in '+org);
		t.ok(data.next === '/orgs/github/people?page=2', org +' has multiple pages of peeps!');
		t.end();
	})
})

//
// test('read list of stars for pandajs/sad ', function(t){
//   var username = 'pandajs/sad';
// 	stars(username, function(err, data) {
// 		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
// 		t.ok(data.entries.length > 0, '"stars": '+data.entries.length);
// 		t.ok(typeof data.next === 'undefined', username +' only has 1 page of stars');
// 		t.end();
// 	});
// })
//
// test('read list of stars for nelsonic/practical-js-tdd (multi-page)', function(t){
//   var username = 'nelsonic/practical-js-tdd';
// 	stars(username, function(err, data) {
// 		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
// 		t.ok(data.entries.length > 50, '"stars": '+data.entries.length);
// 		t.ok(data.next === 'https://github.com/'+username +'/stargazers?page=2', username +' multi-page stars');
//     // crawl second page:
//     stars(data.next, function(err2, data2){
//       t.ok(data2.entries.length > 50, '"stars": '+data.entries.length);
//       t.ok(data2.next === 'https://github.com/'+username +'/stargazers?page=3', username +' multi-page stars');
// 		  t.end();
//     })
// 	});
// })
