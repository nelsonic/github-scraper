var test = require('tape');
var repo = require('../lib/switcher');

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

test('crawl ZERO language repo', function(t){
	var project = '/PeerSun/nodestack';
	repo(project, function(err, stats) {
    // console.log(stats);
    t.ok(stats.langs.length === 0, 'Language is: '+ stats.langs +" (none)")
		t.end();
	})
})
