var test = require('tape');
var issues = require('../lib/issues');

test('expect 400 repo is not stated', function(t){
  var project = '';
  issues(project, function(err, stats){
    t.ok(err === 400, 'got 400 error when no user defined');
    t.end();
  })
})

test('expect random (non-existent) repo to return 404 error ', function(t){
	var project = ''+Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	issues(project, function(err, stats){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof stats === 'undefined', '@param repos is undefined (as expected)');
		t.end();
	})
})

test('crawl known repository that has *many* issues ', function(t){
	var project = 'dwyl/time'
	issues(project, function(err, list) {
    t.ok(err === null, 'No Error when crawling ' +project +' issues');
    console.log(list.entries.length);
		// t.ok(err === 404, 'Got 404 Error when username does not exist');
    var count = list.entries.length;
		t.ok(count > 1, 'repo: ' +project +' has ' +count + ' issues (non-zero) on (First Page)');
    t.ok(list.open > 1, 'repo: ' +project +' has ' +list.open + ' OPEN issues (non-zero)');
    t.ok(list.closed > 10, 'repo: ' +project +' has ' +list.closed + ' CLOSED issues');
    // crawl the next page of issues:
    issues(list.next, function(err2, list2){
      t.ok(list2.open > 10, 'repo: ' +project +' has ' +list.open + ' OPEN issues (non-zero)');
      t.ok(list2.closed > 5, 'repo: ' +project +' has ' +list2.closed + ' CLOSED issues');
      t.end();
    })
	})
})

test('crawl known repository that only has a single page of issues ', function(t){
	var project = 'dwyl/ignored'
	issues(project, function(err, list) {
    t.ok(err === null, 'No Error when crawling ' +project +' issues');
    var count = list.entries.length;
		t.ok(count === 0, 'repo: ' +project +' has ' +count + ' issues (ZERO)');
    t.ok(list.closed > 5, 'repo: ' +project +' has ' +list.closed + ' CLOSED issues');
		t.end();
	})
})
