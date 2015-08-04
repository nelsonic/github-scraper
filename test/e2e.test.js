var gs = require('../lib/');
var test = require('tape');

test('Scrape a known PROFILE @alanshaw', function(t){
  var user = 'alanshaw';
  gs(user, function(err, data) {
    t.ok(data.developerprogram === true, '- @' + user + ' is a member of the "GitHub Developer Program"');
    t.ok(data.followercount > 100, '- @' + user + ' Has more than 100 followers');
    t.ok(data.starred > 100, '- @' + user + ' Has starred more than 100 repos');
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    console.log(data);
    t.end()
  })
})

test('FOLLOWERS LIST for @iteles', function(t){
	var url = 'iteles/followers';
	gs(url, function(err, data) {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    console.log(data);
		t.ok(data.entries.length > 42, url +' count: '+data.entries.length);
		t.end();
	})
})

test.only('FOLLOWING LIST (SECOND PAGE) for @nelsonic', function(t){
	var url = 'nelsonic/following?page=2';
	gs(url, function(err, data) {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    console.log(data);
		t.ok(data.entries.length > 10, url +' count: '+data.entries.length);
		t.end();
	})
})

test('parse @iteles activity feed (expect recent activity)', function(t){
	var user = 'iteles.atom';
	gs(user, function(err, data) {
		t.ok(err === null, 'No error when parsing @' +user +' activity feed');
    var entry = data.entries.filter(function(e){
      return e.indexOf('commented');
    })
    t.ok(data.entries.length === 30, '@' +user +' activity feed contains 30 entries')
		t.end();
	})
})

test('Find the repo with most stars for a given user', function(t) {
  var user = 'iteles?tab=repositories';
  gs(user, function(err, data) {
    data.entries.sort(function(a,b) {
      return b.stars - a.stars ;
    });
    var repo = data.entries[0]
    t.ok(repo.stars > 42, '@' + user +' > ' +repo.name +' has ' + repo.stars +' stars!');
    t.end();
  })
})


test('Scrape an org WITH a next_page of repositories (known data)', function(t){
	var url = 'dwyl';
	gs(url, function(err, data) {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    console.log(data);
		t.ok(data.entries.length > 19, 'org '+url + ' has ' +data.entries.length + ' repos.')
    t.ok(data.next_page === '/dwyl?page=2', 'dwyl has more than one page');
		t.ok(data.pcount > 20 , '"pcount":'+data.pcount + ' (people in the company)');
		t.end();
	});
})


test('find issue with most comments', function(t){
	var project = '/dwyl/tudo/issues'
	gs(project, function(err, data) {
    t.ok(err === null, 'No Error when crawling ' +project +' issues');

    data.entries.sort(function(a,b) {
      return b.comments - a.comments
    })
    var issue = data.entries[0];
    console.log('- - - - - - - - - - - issue with most comments in '+project)
    // console.log(issue)
    t.ok(issue.comments > 4, issue.title + ' has ' + issue.comments + ' comments!')
		t.ok(data.open > 5, 'repo: ' +project +' has ' + data.count + ' issues (ZERO)');
    t.ok(data.closed > 5, 'repo: ' +project +' has ' +data.closed + ' CLOSED issues');
		t.end();
	})
})
