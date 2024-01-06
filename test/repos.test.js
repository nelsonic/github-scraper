var test = require('tape');
var repositories = require('../lib/switcher');

test('crawl @iteles\' list of repositories (expect *many*!)', function(t){
	var url = '/iteles?tab=repositories', repo;
	repositories(url, function(err, repos){
		t.ok(err === null, 'No Error when crawling ' +url +' repos tab');
    // console.log(repos)
    // console.log(' - - - - - - - - - - -')
    repo = repos.entries.filter(function(r) {
      return r.url === '/iteles/iteles.github.io';
    })
    repo = repo[0];
		t.ok(repo.name === 'iteles.github.io', ' repos contains iteles.github.io');
    t.ok(repo.stars > 0, ' repo iteles.github.io has non-zero number of stars: '+repo.stars);
    t.ok(repo.lang === 'HTML', ' repo ' + repo.url + ' is written in: '+repo.lang);
		t.end();
	})
})
