var test = require('tape');
var org = require('../lib/org');

test('Scrape undefined profile (error test) ', function(t) {
	org(null, function(err){
		t.ok(err, 400, 'Receive 400 Error when orgname is undefined');
		t.end();
	})
})

test('Scrape random (non-existent) profile (error test) ', function(t){
	var orgname = '' + Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	org(orgname, function(err, data){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof profile === 'undefined', '@param profile is undefined (as expected)');
		t.end();
	})
})

test('Fetch dwyl Organisation ', function(t){
	var orgname = 'dwyl';
	org(orgname, function(err, data) {
		t.ok(typeof data === 'object', 'data')
		// t.ok(p.developerprogram === true, '- @' + user + ' is a member of the "GitHub Developer Program"');
		t.end();
	});
})
