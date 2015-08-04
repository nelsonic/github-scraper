var test   = require('tape');
var people = require('../lib/switcher');

test('Scrape org with single page of people', function(t){
	var org = 'orgs/tableflip/people'
	people(org, function(err, data){
	  console.log('- - - - - - - - - - - - - - - - - - - - - - > scraping '+org +' (org/people)')
		console.log(data);
		t.ok(data.entries.length > 5, 'There are '+data.entries.length +' people in '+org);
		t.ok(data.entries.indexOf('alanshaw')>-1, 'Alan is a member of '+org)
		t.end();
	})
})

test('Scrape org with multiple pages of people', function(t){
	var org = 'orgs/github/people'
	people(org, function(err, data){
		console.log(data.next_page);
		t.ok(data.entries.length > 20, 'There are '+data.entries.length +' people in '+org);
		t.ok(data.next_page === '/orgs/github/people?page=2', org +' has multiple pages of peeps!');
		people(data.next_page, function(err2, data2){
			t.ok(data2.next_page === '/orgs/github/people?page=3', org +' has multiple pages of peeps!');
			t.end();
		})
	})
})
