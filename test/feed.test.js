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
