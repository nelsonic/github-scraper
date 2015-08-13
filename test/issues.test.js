var test = require('tape');
var issues = require('../lib/switcher');

test('crawl known repository that has *many* issues ', function(t){
	var project = '/dwyl/time/issues'
	issues(project, function(err, list) {
    t.ok(err === null, 'No Error when crawling ' +project +' issues');
    console.log(list.entries.length);
		// t.ok(err === 404, 'Got 404 Error when username does not exist');
    var count = list.entries.length;
		// first page should have 25 issues!
		t.ok(count === 25, 'repo: ' +project +' has ' +count + ' issues (non-zero) on (First Page)');
    t.ok(list.open > 1, 'repo: ' +project +' has ' +list.open + ' OPEN issues (non-zero)');
    t.ok(list.closed > 10, 'repo: ' +project +' has ' +list.closed + ' CLOSED issues');
    // crawl the next page of issues:
    issues(list.next_page, function(err2, list2){
      t.ok(list2.open > 10, 'repo: ' +project +' has ' +list.open + ' OPEN issues (non-zero)');
      t.ok(list2.closed > 5, 'repo: ' +project +' has ' +list2.closed + ' CLOSED issues');
      t.end();
    })
	})
})

test('crawl known repository that only has a single page of issues ', function(t){
	var project = '/dwyl/ignored/issues'
	issues(project, function(err, list) {
		console.log(list)
		t.ok(list.url.indexOf(project) > -1, '✓ url is set: '+list.url)
    t.ok(err === null, 'No Error when crawling ' +project +' issues');
    var count = list.entries.length;
		t.ok(count === 0, 'repo: ' +project +' has ' +count + ' issues (ZERO)');
    t.ok(list.closed > 5, 'repo: ' +project +' has ' +list.closed + ' CLOSED issues');
		t.end();
	})
})

// see: https://github.com/nelsonic/github-scraper/issues/53
test('crawl known repository (FORK) WITHOUT issues ', function(t){
	var project = 'ladieswhocode/london-tech-event-hack-collection/issues'
	issues(project, function(err, list) {
		t.ok(err === 404, '✓ '+project +" has no issues >> HTTP Status: "+err)
		t.end();
	})
})

var wreck   = require('wreck');
var cheerio = require('cheerio')
var issues2  = require('../lib/issues.js');
// see: https://github.com/nelsonic/arana/issues/16
test('Problem Child (Fork) Repo (MANUAL INVOCATION)', function(t){
	var url = 'https://github.com/foundersandcoders/resolve-path'
	wreck.get(url, function (error, response, html) {
		var $ = cheerio.load(html);
		issues2($, url, function(err, data){
			console.log(err, data)
			t.ok(err === 404, '✓ '+url +" Got "+err + " (as expected!)")
			t.end();
		})
	});
})
