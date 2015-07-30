var test = require('tape');
var repo = require('../lib/repo');

test('expect 400 when repo not stated', function(t){
  var project = '';
  repo(project, function(err, stats){
    t.ok(err === 400, 'got 400 error when no user defined');
    t.end();
  })
})

test('expect random (non-existent) repo to return 404 error ', function(t){
	var project = Math.floor(Math.random() * 1000000000000000); // a nice long "random" number
	repo(project, function(err, stats){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof stats === 'undefined', '@param repos is undefined (as expected)');
		t.end();
	})
})

test('crawl known repository for stats', function(t){
	var project = 'nelsonic/adoro';
	repo(project, function(err, stats) {
    console.log(stats);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
		t.ok(stats.watchers > 1, ' has more than 1 watchers: '+stats.watchers);
    t.ok(stats.stars > 5, ' has more than 5 stars: '+stats.stars);
    t.ok(stats.forks > 0, ' has more than 0 forks: '+stats.forks);
    t.ok(stats.branches > 0, ' has non-zero number of branches: '+stats.branches);
    // t.ok(stats.contribs > 0, ' has non-zero number of contributors: '+stats.contribs);
    t.ok(stats.langs[0].indexOf('Java') > -1, 'Language is: '+ stats.langs)
		t.end();
	})
})

test('crawl single language repo', function(t){
	var project = 'nelsonic/coin-change-ruby';
	repo(project, function(err, stats) {
    // console.log(stats);
    t.ok(stats.langs[0].indexOf('Ruby 100') > -1, 'Language is: '+ stats.langs)
		t.end();
	})
})
