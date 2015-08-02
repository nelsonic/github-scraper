var gs = require('../lib/');
var test = require('tape');

test('Scrape a known profile @alanshaw', function(t){
  var user = 'alanshaw';
  gs.profile(user, function(err, data){
    t.ok(data.developerprogram === true, '- @' + user + ' is a member of the "GitHub Developer Program"');
    t.ok(data.followercount > 100, '- @' + user + ' Has more than 100 followers');
    t.ok(data.starred > 100, '- @' + user + ' Has starred more than 100 repos');
    console.log(data);
    t.end()
  })
})

test('parse @iteles activity feed (expect recent activity)', function(t){
	var user = 'iteles';
	gs.feed(user, function(err, data){
		t.ok(err === null, 'No error when parsing @' +user +' activity feed');
    var entry = data.entries.filter(function(e){
      return e.indexOf('commented');
    })
    t.ok(data.entries.length === 30, '@' +user +' activity feed contains 30 entries')
		t.end();
	})
})

test('Find the repo with most stars for a given user', function(t) {
  var user = 'iteles';
  gs.repos(user, function(err, data){
    data.sort(function(a,b){
      return b.stars - a.stars ;
    });
    var repo = data[0]
    t.ok(repo.stars > 42, '@' + user +' > ' +repo.name +' has ' + repo.stars +' stars!');
    t.end();
  })
})


test.only('find issue with most comments', function(t){
	var project = '/dwyl/tudo'
	gs.issues(project, function(err, data) {
    t.ok(err === null, 'No Error when crawling ' +project +' issues');

    data.entries.sort(function(a,b){
      return b.comments - a.comments
    })
    // console.log(data.entries[0])
    var issue = data.entries[0];
    t.ok(issue.comments > 4, issue.title + ' has ' + issue.comments + ' comments!')
		// t.ok(count === 0, 'repo: ' +project +' has ' +count + ' issues (ZERO)');
    t.ok(data.closed > 5, 'repo: ' +project +' has ' +data.closed + ' CLOSED issues');
		t.end();
	})
})
