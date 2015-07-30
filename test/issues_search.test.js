var test = require('tape');
var issues_search = require('../lib/issues_search');

test('expect 400 repo is not stated', function(t) {
  issues_search(function(err) {
    t.ok(err === 400, 'got 400 error when no options defined');
    t.end();
  })
})

test('expect random (non-existent) repo to return zero results ', function(t){
	var options = { username : Math.floor(Math.random() * 1000000000000000) } // a nice long "random" number
	issues_search(options, function(err, list){
    // console.log(err, stats)
		t.ok(err === null, 'Search still returns a 200 with no results');
		t.ok(list.entries.length === 0, 'no issues (as expected)');
		t.end();
	})
})

test('scrape second page of results', function(t){
	var options = {
    next: '/search?o=desc&p=2&q=author%3Aiteles&s=created&state=open&type=Issues'
  }
	issues_search(options, function(err, list){
    // console.log(err, list)
		t.ok(err === null, 'Search still returns a 200 with no results');
    t.ok(list.entries.length > 0, 'non-zero number of issues');
		t.ok(list.entries[0].author === 'iteles', 'issue successfully scraped');
		t.end();
	})
})
// test for next page
//
