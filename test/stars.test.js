var test  = require('tape');
var stars = require('../lib/switcher');

test('read list of stars for pandajs/sad ', function(t){
  var url = 'pandajs/sad/stargazers';
	stars(url, function (err, data) {
	  t.equal(data.type, 'stars', url + ' data.type: ' + data.type);
	  t.ok(data.entries.length > 0, '"stars": '+data.entries.length);
	  const people = data.entries.map(e => e.username);
	  t.ok(people.indexOf('nelsonic') >-1, 'Nelson starred '+ url)
	  t.ok(data.next_page === '', url +' only has 1 page of stars');
	  t.end();
	});
})

test('read list of stars for dwyl/learn-tdd (multi-page)', function(t){
  var url = 'dwyl/learn-tdd/stargazers';
	stars(url, function (err, data) {
		// console.log(data)
		t.equal(data.entries.length, 48, '"stars": '+data.entries.length);
    t.ok(data.next_page.match(/page=2/), url +' multi-page stargazers');
    // crawl second page:
    stars(data.next_page, function(err2, data2) {
      t.equal(data2.entries.length, 48, '"stars": ' + data.entries.length);
      t.ok(data2.next_page.match(/page=3/), url +' multi-page stargazers');
	  t.end();
    })
	});
})
