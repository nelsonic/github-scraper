var test = require('tape');
var profile = require('../lib/switcher');
var dir = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";

test(file + 'Scrape @nelsonic GitHub profile (consistent state profile)', function(t){
	var user = 'nelsonic';
	profile(user, function (err, data) {
		// console.log('data.img:', data.img)
		// t.equal(data.type, 'profile', user + ' data.type: ' + data.type);
		t.ok(data.avatar.match(/githubusercontent.com\/u\/194400/) !== null,
		'Image is what we expect: ' + data.avatar);
		t.ok(data.uid === 194400, '@' + user + ' has GitHub user_id: ' + data.uid);
		t.ok(data.username === 'nelsonic', '@' + user + ' username: ' + data.username);

		// t.ok(data.current > 400, 'Current Streak ' + data.current +' is over 500 days!');
		t.ok(data.name   === 'Nelson',
			'- @' + user + ' Name:' + data.name);
		t.ok(data.worksfor === '@dwyl', user + ' Works for ' + data.worksfor);
		// t.ok(data.email    === 'contact.nelsonic+github@gmail.com',
			// '- @' + user + ' Email address is: contact.nelsonic@gmail.com');
		// console.log('data.website:', data.website);
		t.ok(data.website  === 'https://dwyl.com',
			user + ' Website URL is ' + data.website);
		// console.log(data.location);
		t.ok(data.location === 'London', '- @' + user + ' Based in London');
		t.ok(data.followers > 400, '- @' + user + ' Has more than 400 followers');
		t.ok(data.stars > 100, '- @' + user + ' Has starred '+ data.starred);

		t.ok(data.following > 300, '- @' + user
			+ ' Is following more than 300 people');
		t.ok(data.contribs > 3000, '- @' + user + ' Has made ' + data.contribs
			+ ' contributions to Open Source this year!');

		t.ok(data.pinned.length === 6, '- @' + user
			+ ' Has Six "Pinned" Repositories');

		t.ok(Object.keys(data.orgs).length > 2, '- @' + user + ' Is a member of '
			+ Object.keys(data.orgs).length + ' Orgs');

		t.ok(data.developerprogram === true, '- @'
			+ user + ' is a member of the "GitHub Developer Program"');
		// regression: https://github.com/nelsonic/github-scraper/issues/79
		t.ok(data.stars > 2000, '- @' + user + ' Has starred ' + data.stars);

		t.end();
	});
});

test(file + 'Check @torvalds IS NOT GitHub Dev Program Member', function(t){
	var url = 'torvalds';
	profile(url, function(err, data) {
		t.ok(typeof data.developerprogram === 'undefined', '- @' + url
			+ ' is NOT a member of the "GitHub Developer Program"');
		t.end();
	});
});

test(file + 'Scrape @iteles detailed contribution matrix', function(t){
	var user = 'iteles';
	profile(user, function(err, data) {
		t.ok(data.bio.match(/Co-founder/i), '- @' + user + ' bio: ' + data.bio);
		t.ok(data.contribs > 300, '- @' + user + ' Has made ' + data.contribs
			+ ' contributions to Open Source this year!');

		t.end();
	});
});

test(file + '@dwylbot does not have a location!', function(t){
	var url = 'dwylbot';
	profile(url, function(err, data) {
		t.ok(typeof data.location === 'undefined', '- @' + url + ' is virtual!');
		t.end();
	});
});
