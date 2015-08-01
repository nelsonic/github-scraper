var test      = require('tape');
var followers = require('../lib/follers');

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
		t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.pcount > 10, '"pcount":'+data.pcount);
		t.ok(data.next === '/dwyl?page=2', 'dwyl has more than one page');
		t.end();
	});
})
