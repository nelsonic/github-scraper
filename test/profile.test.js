var test    = require('tape');
var profile = require('../lib/switcher');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";

test(file + 'Scrape @nelsonic GitHub profile (consistent state profile)', function(t){
	var user = 'nelsonic';
	profile(user, function(err, data){
		console.log(data)

		t.ok(data.img === 'https://avatars1.githubusercontent.com/u/194400?v=4&s=460',
		'Image is what we expect: ' + data.img);
		t.ok(data.uid === 194400, '@' + user + ' has GitHub user_id: ' + data.uid);

		// t.ok(data.current > 400, 'Current Streak ' + data.current +' is over 500 days!');
		t.ok(data.fullname   === 'Nelson', '- @' + user + ' Full Name:' + data.fullname);
		t.ok(data.worksfor === 'dwyl.io', '- @' + user + ' Works for dwyl');
		// t.ok(data.email    === 'contact.nelsonic+github@gmail.com',
			// '- @' + user + ' Email address is: contact.nelsonic@gmail.com');
		t.ok(data.website  === 'http://www.dwyl.io/', '- @'
			+ user + ' Website URL is linkedin');
		t.ok(data.location === 'London', '- @' + user + ' Based in London');
		t.ok(data.followers > 400, '- @' + user + ' Has more than 400 followers');
		t.ok(data.stars > 100, '- @' + user + ' Has starred '+ data.starred);
		t.ok(data.following > 300, '- @' + user + ' Is following more than 300 people');
		t.ok(data.contribs > 5000, '- @' + user + ' Has made ' + data.contribs
			+ ' contributions to Open Source this year!');
		t.ok(data.pinned.length === 6, '- @' + user + ' Has Six "Pinned" Repositories');
		t.ok(Object.keys(data.orgs).length > 6, '- @' + user + ' Is a member of '
			+ Object.keys(data.orgs).length + ' Orgs');

		t.ok(data.developerprogram === true, '- @'
			+ user + ' is a member of the "GitHub Developer Program"');
		// regression: https://github.com/nelsonic/github-scraper/issues/79
		t.ok(data.stars > 2000, '- @' + user + ' Has starred ' + data.stars);
		t.end();
	});
});

test(file + 'Check @olizilla profile IS NOT GitHub Developer Program Member', function(t){
	var url = 'olizilla';
	profile(url, function(err, data) {
		t.ok(typeof data.developerprogram === 'undefined', '- @' + url + ' is NOT a member of the "GitHub Developer Program"');
		t.end();
	});
});

test(file + 'Scrape @iteles detailed contribution matrix', function(t){
	var user = 'iteles';
	profile(user, function(err, data) {
		// console.log(data)
		// map reduce?  https://www.airpair.com/javascript/javascript-array-reduce
		var contribs = Object.keys(data.contrib_matrix)
		.map((k) => { return data.contrib_matrix[k].count; })
		.reduce((total, num) => { return total + num; });
		// console.log(contribs);
		t.ok(contribs === data.contribs, "Contribution Matrix matches Total: " + contribs);

		t.ok(data.contribs > 500, '- @' + user + ' Has made ' + data.contribs
			+ ' contributions to Open Source this year!');

		t.end();
	});
});
