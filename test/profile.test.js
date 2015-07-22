var test = require('tape');
var profile = require('../lib/profile');

test('Scrape @nelsonic GitHub profile (consistent state profile)', function(t){
	var user = 'nelsonic';
	profile(user, function(err, p){
		console.log(p)
		t.ok(p.current > 500, 'Current Streak ' + p.current +' is over 500 days!');
		t.ok(p.joined   === '2010-02-02T08:44:49Z', '- @' + user + ' Joined Date 2009-01-20T10:54:20Z has not chaged');
		t.ok(p.worksfor === 'dwyl.io', '- @' + user + ' Works for dwyl');
		t.ok(p.email    === 'contact.nelsonic@gmail.com', '- @' + user + ' Email address is: contact.nelsonic@gmail.com');
		t.ok(p.url      === 'http://linkedin.com/in/nelsonic', '- @' + user + ' Website URL is linkedin');
		t.ok(p.location === 'London', '- @' + user + ' Based in London');
		t.ok(p.followercount > 100, '- @' + user + ' Has more than 100 followers');
		t.ok(p.stared > 100, '- @' + user + ' Has starred more than 100 repos');
		t.ok(p.followingcount > 50, '- @' + user + ' Is following more than 50 people');
		t.ok(p.contribs > 2000, '- @' + user + ' Has made at least 2000 contributions to Open Source this year');
		t.ok(p.longest > 6, '- @' + user + ' Has a decent contribution "streak"')
		t.end();
	});
})

test('Scrape undefined profile (error test) ', function(t){
	profile(null, function(err, profile){
		t.ok(err, 400, 'Receive 400 Error when username is undefined');
		t.end();
	})
})

test('Scrape random (non-existent) profile (error test) ', function(t){
	var user = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	profile(user, function(err, profile){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof profile === 'undefined', '@param profile is undefined (as expected)');
		t.end();
	})
})

test('Check @alanshaw profile for GitHub Developer Program Membership', function(t){
	var user = 'alanshaw';
	profile(user, function(err, p) {
		t.ok(p.developerprogram === true, '- @' + user + ' is a member of the "GitHub Developer Program"');
		t.end();
	});
})
