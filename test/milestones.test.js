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
	var project = '/'+Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	milestones(project, function(err, data){
		t.ok(err === 404, 'Got 404 Error when repo does not exist');
		t.ok(typeof data === 'undefined', '@param list is undefined (as expected)');
		t.end();
	})
})

test('crawl /dwyl/tudo/milestones', function(t){
	var project = '/dwyl/tudo';
	milestones(project, function(err, data) {
    console.log(data);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
    t.ok(data.open > 0, 'data.open '+data.open);
    t.ok(data.closed > 0, 'data.closed '+data.closed);
		t.end();
	})
})

test('/rethinkdb/rethinkdb has many milestones', function(t){
	var project = '/rethinkdb/rethinkdb';
	milestones(project, function(err, data) {
    // console.log(list);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
    t.ok(data.open > 2, 'data.open '+data.open);
    t.ok(data.entries.length === data.open, project + " has " + data.entries.length +' milestones' )
    t.ok(data.closed > 0, 'data.closed '+data.closed);
		t.end();
	})
})
