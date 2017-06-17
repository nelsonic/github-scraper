var test = require('tape');
var feed = require('../lib/switcher');

test('parse @iteles activity feed (expect recent activity)', function(t){
	var user = 'iteles.atom';
	feed(user, function(err, data){
		t.ok(err === null, 'No error when parsing @' +user +' activity feed');
    var entry = data.entries.filter(function(e){
      return e.indexOf('commented');
    })
    t.ok(data.entries.length === 30, '@' +user +' activity feed contains 30 entries')
		t.end();
	})
})

test('Try to break it by supplying non-existent user', function(t){
	var user = '' + Math.floor(Math.random() * 1000000000000000) + '.atom';
	feed(user, function(err, data){
    t.ok(err === 404, 'Got 404 Error when username does not exist');
		// t.ok(data === null, 'No data for @' +user +' activity feed');
    // t.ok(data.entries.length === 30, '@' +user +' activity feed contains 30 entries')
		t.end();
	})
})
