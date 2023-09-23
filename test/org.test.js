var test = require('tape');
var org  = require('../lib/switcher');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";

test(file + 'Scrape an org WITHOUT a next page (known data)', function(t){
	var url = '/peersun';
	org(url, function(err, data) {
		t.equal(data.type, 'org', url + ' data.type: ' + data.type);
		t.ok(data.entries.length > 5, 'org '
			+ url + ' has ' + data.entries.length + ' repos.')
		// t.ok(data.pcount === 0, '"pcount":' + data.pcount);

		const last = data.entries[data.entries.length-1];
		if (last === undefined) {
			t.fail("No entries found")
			t.end();
			return;
		}
		t.equal(last.updated, '2014-02-18T23:09:24Z',
			'last.updated: ' + last.updated);
		// console.log(' - - - - - - - - - - - - - data.entries:');
		// console.log(data.entries);
		// console.log(' - - - - - - - - - - - - -');
		t.end();
	});
})

test(file + 'Scrape an org WITH a next page', function(t){
	var url = '/github';
	org(url, function(err, data) {
		// delete(data.entries)
		// console.log(err, data);
		// t.ok(data.pcount > 100, '"pcount":'+data.pcount);
		t.ok(data.location === 'San Francisco, CA', 'data.location: '+data.location);
		t.ok(data.website === 'https://github.com/about', 'data.url: '+data.url);
		//t.ok(data.email === 'support@github.com', 'data.email: '+data.email);
		// Email doesn't exist in github organization page anymore, so scraping won't be finding it.
		t.equal(data.uid, 9919, url + ' uid is ' + data.uid);
		t.end();
	});
})

// Test deleted since there are no org "second pages"

test(file + 'ORG with no people', function(t){
	var url = '/pandajs';
	org(url, function(err, data) {
		// console.log('data', data);
		t.equal(data.description,
			"people who are super into pandas and javascript!",
			'data.description: ' + data.description)
		t.ok(typeof data.website === 'undefined', "No website")
		t.ok(typeof data.location === 'undefined', "No location")
		t.ok(typeof data.email === 'undefined', "No email")
		// t.ok(data.pcount === 0, url + ' "pcount":'+data.pcount);
		t.end();
	});
})
