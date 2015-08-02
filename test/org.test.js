var test = require('tape');
var org = require('../lib/org');

test('Scrape undefined profile (error test) ', function(t) {
	org(null, function(err){
		t.ok(err, 400, 'Receive 400 Error when orgname is undefined');
		t.end();
	})
})

test('Scrape random (non-existent) profile (error test) ', function(t){
	var orgname = '/' + Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	org(orgname, function(err, data){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof profile === 'undefined', '@param profile is undefined (as expected)');
		t.end();
	})
})

test('Fetch dwyl Organisation ', function(t){
	var orgname = '/dwyl';
	org(orgname, function(err, data) {
		t.ok(data.entries.length === 20, 'first page of org has 20 repos: '+data.entries.length)
		t.ok(data.pcount > 10, '"pcount":'+data.pcount);
		t.ok(data.next === '/dwyl?page=2', 'dwyl has more than one page');
		t.end();
	});
})

test('Fetch Second page of dwyl org', function(t){
	var orgname = '/dwyl?page=2';
	org(orgname, function(err, data) {
		// console.log(data);
		t.ok(data.entries.length === 20, 'SECOND page of org has 20 repos: '+data.entries.length)
		t.ok(data.pcount > 10, '"pcount":'+data.pcount);
		t.ok(data.next === '/dwyl?page=3', 'dwyl has more than one page');
		t.end();
	});
})

test('Scrape an org without a next page (known data)', function(t){
	var orgname = '/PeerSun';
	org(orgname, function(err, data) {
		// console.log(data);
		t.ok(data.entries.length === 5, 'org '+orgname + ' has ' +data.entries.length + ' repos.')
		t.ok(data.pcount === 1, '"pcount":'+data.pcount);
		t.end();
	});
})

test('Scrape an org without a next page (known data)', function(t){
	var orgname = '/github';
	org(orgname, function(err, data) {
		console.log(data);
		// t.ok(data.entries.length === 5, 'org '+orgname + ' has ' +data.entries.length + ' repos.')
		t.ok(data.pcount > 100, '"pcount":'+data.pcount);
		t.ok(data.pcount > 100, '"pcount":'+data.pcount);
		t.ok(data.location === 'San Francisco, CA', 'data.location: '+data.location);
		t.ok(data.url === 'https://github.com/about', 'data.url: '+data.url);
		t.ok(data.email === 'support@github.com', 'data.email: '+data.email);

		t.end();
	});
})
