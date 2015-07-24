var test = require('tape');
var repo = require('../lib/repo');

test('expect 400 when username not stated', function(t){
  var user = '';
  repo(user, function(err, stats){
    t.ok(err === 400, 'got 400 error when no user defined');
    t.end();
  })
})

test('expect random (non-existent) user to return 404 error ', function(t){
	var user = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	repo(user, function(err, stats){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof stats === 'undefined', '@param repos is undefined (as expected)');
		t.end();
	})
})

/*
test('crawl @iteles list of repositories (expect *many*!)', function(t){
	var user = 'iteles', repo;
	repositories(user, function(err, repos){
		t.ok(err === null, 'No Error when crawling ' +user +' repos tab');
    // console.log(repos);
    repo = repos.filter(function(r){
      return r.url === '/iteles/iteles.github.io';
    })
    repo = repo[0];
    // console.log(repo)
		t.ok(repo.name === 'iteles.github.io', ' repos contains iteles.github.io');
    t.ok(repo.stars > 0, ' repo iteles.github.io has non-zero number of stars: '+repo.stars);

    repo = repos.filter(function(r){
      return r.url === '/iteles/All-the-Hellos';
    })
    repo = repo[0];
    // console.log(repo);
    t.ok(repo.lang === 'JavaScript', ' repo ' + repo.url + ' is written in: '+repo.lang);
		t.end();
	})
})
*/
