var test = require('tape');
var feed = require('../lib/feed');

test('expect 400 when username not stated', function(t){
  var user = '';
  feed(user, function(err, repos){
    t.ok(err === 400, 'got 400 error when no user defined');
    t.end();
  })
})

test('expect random (non-existent) user to return 404 error ', function(t){
	var user = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	feed(user, function(err, repos){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof repos === 'undefined', '@param repos is undefined (as expected)');
		t.end();
	})
})

test('parse @iteles activity feed (expect recent activity)', function(t){
	var user = 'iteles', repo;
	feed(user, function(err, repos){
		t.ok(err === null, 'No error when parsing ' +user +' activity feed');

		t.end();
	})
})
