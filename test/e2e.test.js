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

test('FOLLOWING LIST (SECOND PAGE) for @nelsonic', function(t){
	var url = 'nelsonic/following?page=2';
	gs(url, function(err, data) {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    console.log(data);
		t.ok(data.entries.length > 10, url +' count: '+data.entries.length);
		t.end();
	})
})

test('STARRED repos for @iteles (multi-page)', function(t){
  var username = 'stars/iteles';
	gs(username, function(err, data) {
    // t.ok(data.repos.length === 20, 'first page of org has 20 repos: '+data.repos.length)
		t.ok(data.entries.length === 30, '@'+username +' has only "starred": '+data.entries.length +' repos (first page)');
		t.ok(data.next_page.indexOf('page=2') > -1, '@'+username +' has multiple pages of starred repos');
		gs(data.next_page, function(err2, data2){
			console.log(data2.next_page)
      console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
      console.log(data2);
			t.ok(data2.next_page.indexOf('page=3') > -1, '@'+username +' has multiple pages of starred repos');
			t.end();
		})
	});
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
});

test('Find the repo with most stars for a given user', function(t) {
  var user = 'iteles?tab=repositories';
  gs(user, function(err, data) {
    console.log(data)
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    data.entries.sort(function(a,b) {
      return b.stars - a.stars ;
    });
    var repo = data.entries[0]
    t.ok(repo.stars > 42, '@' + user +' > ' +repo.name +' has ' + repo.stars +' stars!');
    t.end();
  })
});


test('Scrape an ORG WITH a next_page of repositories (known data)', function(t){
	var url = 'dwyl';
	gs(url, function(err, data) {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    console.log(data);
		t.ok(data.entries.length > 19, 'org '+url + ' has ' +data.entries.length + ' repos.')
    t.ok(data.next_page === '/dwyl?page=2', 'dwyl has more than one page');
		t.ok(data.pcount > 20 , '"pcount":'+data.pcount + ' (people in the company)');
		t.end();
	});
});


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

test('Crawl a REPOSITORY single language repo', function(t){
	var project = 'nelsonic/practical-js-tdd';
	gs(project, function(err, data) {
    console.log(data);
    t.ok(data.langs[0].indexOf('JavaScript') > -1, 'Language is: '+ data.langs)
		t.end();
	})
})

test('LABELS for dwyl/tudo/labels', function(t){
	var url = '/dwyl/time/labels';
	gs(url, function(err, list) {
    console.log(list);
		t.ok(err === null, 'No Error when crawling ' + url +' (repo pages)');
    var question = list.entries.filter(function(item){
      return item.name === 'question';
    })
    question = question[0];
		t.ok(question.link === url+'/question', 'question.link is : '+question.link+ ' === ' +url+'/question');
    t.ok(question.count > 1, 'question.count (number of open issues): '+question.count);
    t.ok(question.style.indexOf('#fff') > -1, 'question.styles are '+question.style);
		t.end();
	})
})

test('MILESTONSE for /dwyl/tudo/milestones', function(t){
	var url = '/dwyl/tudo/milestones';
	gs(url, function(err, data) {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    console.log(data);
		t.ok(err === null, 'No Error when crawling ' + url +' (repo pages)');
    t.ok(data.open > 0, 'data.open '+data.open);
    t.ok(data.closed > 0, 'data.closed '+data.closed);
		t.end();
	})
})

test('ISSUE contens without milestone', function(t){
	var url = '/dwyl/time/issues/154';
	gs(url, function(err, data){
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
	  console.log(data);
	  var d = data.entries.filter(function(item){
	    return item.id === 'issuecomment-104228711';
	  })
	  d = d[0] // there should only be one entry
		t.ok(data.state === 'Closed', url +' state is: ' + data.state)

		t.ok(d.body === 'I Love you!', url +' last comment is: - - - - - - - - > '+d.body);
		t.end()
	});
})

test('ORG PEOPLE ', function(t){
	var url = 'orgs/dwyl/people';
	gs(url, function(err, data){
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - dwyl people:')
	  console.log(data.entries.sort().join(', '));

		t.ok(data.entries.indexOf('iteles') > -1, url +' has '+data.entries.length + ' people');
		t.end()
	});
})
