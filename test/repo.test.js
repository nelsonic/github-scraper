var test = require('tape');
var repo = require('../lib/switcher');

test.skip('crawl known repository for stats', function(t) {
	var project = 'dwyl/adoro';
	repo(project, function(err, stats) {
    console.log(stats);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
		t.ok(stats.watchers > 3, ' has more than 1 watchers: '+stats.watchers);
    t.ok(stats.stars > 10, ' has more than 5 stars: '+stats.stars);
    t.ok(stats.forks > 0, ' has more than 0 forks: '+stats.forks);
    t.ok(stats.branches > 0, ' has non-zero number of branches: '+stats.branches);
		t.ok(stats.langs[0].indexOf('HTML') > -1, 'Language is: '+ stats.langs);
		t.end();
	})
})

test.skip('crawl single language repo', function(t){
	var project = 'nelsonic/coin-change-ruby';
	repo(project, function(err, stats) {
    t.ok(stats.langs[0].indexOf('Ruby 100') > -1, 'Language is: '+ stats.langs)
		t.end();
	})
})

test.skip('crawl ZERO language repo', function(t){
	var project = '/PeerSun/nodestack';
	repo(project, function(err, stats) {
    t.ok(stats.langs.length === 0, 'Language is: '+ stats.langs +" (none)")
		t.end();
	})
})
