var test       = require('tape');
var milestones = require('../lib/switcher');

test('crawl /dwyl/tudo/milestones', function(t){
	var project = '/dwyl/tudo/milestones';
	milestones(project, function(err, data) {
    console.log(data);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
    t.ok(data.open > 0, 'data.open '+data.open);
    t.ok(data.closed > 0, 'data.closed '+data.closed);
		t.end();
	})
})

test('/rethinkdb/rethinkdb has many milestones', function(t){
	var project = '/rethinkdb/rethinkdb/milestones';
	milestones(project, function(err, data) {
    // console.log(list);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
    t.ok(data.open > 2, 'data.open '+data.open);
    t.ok(data.entries.length === data.open, project + " has " + data.entries.length +' open milestones' )
    t.ok(data.closed > 0, project + ' closed milestones: '+data.closed);
		t.end();
	})
})
