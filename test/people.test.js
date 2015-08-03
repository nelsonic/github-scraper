var test      = require('tape');
var people = require('../lib/people');

test('Scrape undefined profile (error test) ', function(t) {
	people(null, function(err){
		t.ok(err, 400, 'Receive 400 Error when orgname is undefined');
		t.end();
	})
})

test('Scrape random (non-existent) profile (error test) ', function(t){
	var org = '' + Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	people(org, function(err, data){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof data === 'undefined', '@param profile is undefined (as expected)');
		t.end();
	})
})

test('Scrape org with single page of people', function(t){
	var org = '/tableflip'
	people(org, function(err, data){
	  console.log('- - - - - - - - - - - - - - - - - - - - - - > scraping '+org +' (org/people)')
		console.log(data);
		t.ok(data.entries.length > 5, 'There are '+data.entries.length +' people in '+org);
		t.ok(data.entries.indexOf('alanshaw')>-1, 'Alan is a member of '+org)
		t.end();
	})
})

test('Scrape org with multiple pages of people', function(t){
	var org = '/github'
	people(org, function(err, data){
		console.log(data.next);
		t.ok(data.entries.length > 20, 'There are '+data.entries.length +' people in '+org);
		t.ok(data.next === '/orgs/github/people?page=2', org +' has multiple pages of peeps!');
		people(data.next, function(err2, data2){
			t.ok(data2.next === '/orgs/github/people?page=3', org +' has multiple pages of peeps!');
			t.end();
		})
	})
})
