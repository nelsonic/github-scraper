/* Changes:
Added prefix to test names,
fixed multipage test second part to look at the data,
parametrized star max count
formatted document */

var test = require('tape');
var stars = require('../lib/switcher');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";

test(file + 'read list of stars for pandajs/sad ', function (t) {
	var url = 'pandajs/sad/stargazers';
	stars(url, function (err, data) {
		t.equal(data.type, 'stars', url + ' data.type: ' + data.type);
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length > 0, '"stars": ' + data.entries.length);
		const people = data.entries.map(e => e.username);
		t.ok(people.indexOf('nelsonic') > -1, 'Nelson starred ' + url)
		t.ok(typeof data.next_page === 'undefined', url + ' only has 1 page of stars');
		t.end();
	});
})

test(file + 'read list of stars for dwyl/learn-tdd (multi-page)', function (t) {
	var url = 'dwyl/learn-tdd/stargazers';
	const pageStarMaxCount = 48;
	stars(url, function (err, data) {
		t.equal(data.entries.length, pageStarMaxCount, `First page stars: '+${data.entries.length} (Should've been ${pageStarMaxCount})`);
		t.ok(data.next_page.indexOf(url + '?page=2') > -1, `Should have had second page, had ${data.next_page}`);
		// crawl second page:
		stars(data.next_page, function (err2, data2) {
			t.equal(data2.entries.length, pageStarMaxCount, `Second page stars: '+${data2.entries.length} (Should've been ${pageStarMaxCount})`);
			t.ok(data2.next_page.indexOf(url + '?page=3') > -1, `Should have had third page, had ${data2.next_page}`);
			t.end();
		})
	});
})
