var test = require('tape');
var repo = require('../lib/switcher');

test('crawl known repository for stats', function(t) {
	var project = 'dwyl/adoro';
	repo(project, function(err, stats) {
		// console.log(stats);
		t.equal(stats.type, 'repo', project + ' data.type: ' + stats.type);
		t.ok(err === null, 'No Error when crawling ' + project +' (repo pages)');
		t.ok(stats.watchers > 3, ' has more than 1 watchers: '+stats.watchers);
    t.ok(stats.stars > 10, ' has more than 5 stars: '+stats.stars);
    t.ok(stats.forks > 0, ' has more than 0 forks: '+stats.forks);
    t.ok(stats.branches > 0, ' has non-zero number of branches: '+stats.branches);
		t.ok(stats.langs[0].indexOf('HTML') > -1, 'Language is: '+ stats.langs);
		t.end();
	})
})

test('crawl single language repo', function(t){
	var project = 'nelsonic/coin-change-ruby';
	repo(project, function(err, stats) {
    t.ok(stats.langs[0].indexOf('Ruby 100') > -1, 'Language is: '+ stats.langs)
		t.end();
	})
})

test('crawl ZERO language repo', function(t){
	var project = '/PeerSun/nodestack';
	repo(project, function(err, stats) {
    t.ok(stats.langs.length === 0, 'Language is: '+ stats.langs +" (none)")
		t.end();
	})
})

test('crawl forked repo', function(t){
  var project = '/backhand/github-scraper';
  repo(project, function(err, stats) {
    t.ok(stats.forkedfrom === '/nelsonic/github-scraper', 'Repo forked from /nelsonic/github-scraper')
    t.end();
  })
})

test('crawl /dwyl/start-here (known repo)', function(t){
  var project = '/dwyl/start-here';
  repo(project, function(err, stats) {
		t.ok(stats.description.indexOf('Quick-start Guide') > -1, 
			project + ' description: ' + stats.description);
    t.end();
  })
})

test('dwyl/todo-list-javascript-tutorial known website', function(t){
  var project = 'dwyl/todo-list-javascript-tutorial';
  repo(project, function(err, stats) {
		// console.log('stats:', stats)
		t.ok(stats.website === 'https://todomvc-app.herokuapp.com', 
			project + ' website: ' + stats.website);
		t.ok(stats.tags.indexOf('javascript') > -1, 
			project + ' tags: ' + stats.tags);
    t.end();
  })
})

test('crawl repo with lots of stars', function(t) {
	var project = 'angular/angular';
	repo(project, function(err, stats) {
		t.ok(stats.watchers > 1000, ' has more than 1000 watchers: '+stats.watchers);
    t.ok(stats.stars > 1000, ' has more than 1000 stars: '+stats.stars);
    t.ok(stats.forks > 1000, ' has more than 1000 forks: '+stats.forks);
    t.ok(stats.commits > 1000, ' has more than 1000 commits: '+stats.commits);
		t.end();
	})
})