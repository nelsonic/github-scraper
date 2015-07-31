var test       = require('tape');
var milestones = require('../lib/milestones');

test('expect 400 when repo not stated', function(t){
  var project = '';
  milestones(project, function(err){
    t.ok(err === 400, 'got 400 error when no user defined');
    t.end();
  })
})

test('expect random (non-existent) repo to return 404 error ', function(t){
	var project = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	milestones(project, function(err, list){
		t.ok(err === 404, 'Got 404 Error when repo does not exist');
		t.ok(typeof list === 'undefined', '@param list is undefined (as expected)');
		t.end();
	})
})

test('crawl dwyl/tudo/milestones', function(t){
	var project = 'dwyl/tudo';
	milestones(project, function(err, list) {
    console.log(list);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
    t.ok(list.open > 0, 'list.open '+list.open);
    t.ok(list.closed > 0, 'list.closed '+list.closed);
		t.end();
	})
})
