var test  = require('tape');
var stars = require('../lib/switcher');

test('read list of stars for pandajs/sad ', function(t){
  var url = 'pandajs/sad/stargazers';
	stars(url, function (err, data) {
		t.equal(data.type, 'stars', url + ' data.type: ' + data.type);
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length > 0, '"stars": '+data.entries.length);
		const people = data.entries.map(e => e.username);
	  t.ok(people.indexOf('nelsonic') >-1, 'Nelson starred '+ url)
		t.ok(typeof data.next_page === 'undefined', url +' only has 1 page of stars');
		t.end();
	});
})

test('read list of stars for dwyl/learn-tdd (multi-page)', function(t){
  var url = 'dwyl/learn-tdd/stargazers';
	stars(url, function (err, data) {
		// t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.equal(data.entries.length, 30, '"stars": '+data.entries.length);
    t.ok(data.next_page.indexOf(url + '?after=') > -1,
      url +' multi-page stargazers');
    // crawl second page:
    stars(data.next_page, function(err2, data2){
      t.equal(data.entries.length, 30, '"stars": '+data.entries.length);
      t.ok(data.next_page.indexOf(url + '?after=') > -1,
        url +' multi-page stargazers');
		  t.end();
    })
	});
})
