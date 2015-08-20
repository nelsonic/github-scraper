var test    = require('tape');
var profile = require('../lib/switcher');

test('Scrape @nelsonic GitHub profile (consistent state profile)', function(t){
	var user = 'nelsonic';
	profile(user, function(err, data){
		console.log(data)
		t.ok(data.current > 500, 'Current Streak ' + data.current +' is over 500 days!');
		t.ok(data.joined   === '2010-02-02T08:44:49Z', '- @' + user + ' Joined Date 2009-01-20T10:54:20Z has not chaged');
		t.ok(data.worksfor === 'dwyl.io', '- @' + user + ' Works for dwyl');
		t.ok(data.email    === 'contact.nelsonic@gmail.com', '- @' + user + ' Email address is: contact.nelsonic@gmail.com');
		t.ok(data.website  === 'http://www.dwyl.io/', '- @' + user + ' Website URL is linkedin');
		t.ok(data.location === 'London', '- @' + user + ' Based in London');
		t.ok(data.followercount > 100, '- @' + user + ' Has more than 100 followers');
		t.ok(data.starred > 100, '- @' + user + ' Has starred '+ data.starred);
		t.ok(data.followingcount > 50, '- @' + user + ' Is following more than 50 people');
		t.ok(data.contribs > 2000, '- @' + user + ' Has made at least 2000 contributions to Open Source this year');
		t.ok(data.longest > 6, '- @' + user + ' Has a decent contribution "streak"')
		t.ok(data.developerprogram === true, '- @' + user + ' is a member of the "GitHub Developer Program"');
		t.end();
	});
})

test('Check @olizilla profile IS NOT GitHub Developer Program Member', function(t){
	var url = 'olizilla';
	profile(url, function(err, data) {
		t.ok(typeof data.developerprogram === 'undefined', '- @' + url + ' is NOT a member of the "GitHub Developer Program"');
		t.end();
	});
})
