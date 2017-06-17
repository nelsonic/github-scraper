var test    = require('tape');
var profile = require('../lib/switcher');

test('Scrape @nelsonic GitHub profile (consistent state profile)', function(t){
	var user = 'nelsonic';
	profile(user, function(err, data){
		console.log(data)

		t.ok(data.img === 'https://avatars3.githubusercontent.com/u/194400?v=3&s=460',
		'Image is what we expect: ' + data.img);
		t.ok(data.uid === 194400, '@' + user + ' has GitHub user_id: ' + data.uid);
		// t.ok(data.current > 400, 'Current Streak ' + data.current +' is over 500 days!');
		// t.ok(data.joined   === '2010-02-02T08:44:49Z', '- @' + user + ' Joined Date 2009-01-20T10:54:20Z has not chaged');
		t.ok(data.worksfor === 'dwyl.io', '- @' + user + ' Works for dwyl');
		// t.ok(data.email    === 'contact.nelsonic+github@gmail.com', '- @' + user + ' Email address is: contact.nelsonic@gmail.com');
		t.ok(data.website  === 'http://www.dwyl.io/', '- @' + user + ' Website URL is linkedin');
		// t.ok(data.location === 'London', '- @' + user + ' Based in London');
		t.ok(data.followers > 400, '- @' + user + ' Has more than 400 followers');
		t.ok(data.stars > 100, '- @' + user + ' Has starred '+ data.starred);
		t.ok(data.following > 300, '- @' + user + ' Is following more than 300 people');
		// t.ok(data.contribs > 2000, '- @' + user + ' Has made at least 2000 contributions to Open Source this year');
		t.ok(data.pinned.length === 6, '- @' + user + ' Has Six "Pinned" Repositories');
		t.ok(data.orgs.length > 6, '- @' + user + ' Is a member of '+ data.orgs.length + ' Orgs');

		// t.ok(data.developerprogram === true, '- @' + user + ' is a member of the "GitHub Developer Program"');
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
