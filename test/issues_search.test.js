var test = require('tape');
var issues_search = require('../lib/issues_search');

test('expect 400 repo is not stated', function(t) {
  issues_search(function(err, stats) {
    t.ok(err === 400, 'got 400 error when no options defined');
    t.end();
  })
})

test('expect random (non-existent) repo to return 404 error ', function(t){
	var options = { username : Math.floor(Math.random() * 1000000000000000) } // a nice long "random" number
	issues_search(options, function(err, stats){
    console.log(err, stats)
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		// t.ok(typeof stats === 'undefined', '@param repos is undefined (as expected)');
		t.end();
	})
})
