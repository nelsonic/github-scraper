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
	var project = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	issues(project, function(err, stats){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof stats === 'undefined', '@param repos is undefined (as expected)');
		t.end();
	})
})
