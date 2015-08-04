var test  = require('tape');
var issue = require('../lib/switcher');

test('Scrape /dwyl/tudo/issues/51 for all comments and meta-data', function(t){
	var url = '/dwyl/tudo/issues/51';
	issue(url, function(err, data) {
		t.ok(data.url.indexOf(url) > -1, url + ' is: ' +data.url)
		t.ok(data.title.length > 0, url + ' has title: '+data.title);
		t.ok(data.state.length > 0, url + ' is: '+data.state);
		t.ok(data.author.length > 0, url + ' was authored by: '+data.author);
		t.ok(data.created.length > 0, url + ' was created on: '+data.created);
		// labels
		t.ok(data.labels.length > 2, url + ' has '+data.labels.length + ' labels')
		t.ok(data.milestone === 'Minimal Usable Product', 'Milestone is: '+data.milestone);
		t.ok(data.assignee.length > 0, url + ' has assignee: '+ data.assignee);
		t.ok(data.participants.length > 2, url + ' has participants: ' + data.participants);
		t.ok(data.participants.indexOf('iteles') > -1, url + ' has participation from @iteles');

		t.ok(data.entries.length > 2, url + ' has: '+data.entries.length);

		t.end();
	});
})

test('Scrape known issue without assignee', function(t) {
	var url ='/1602/compound/issues/20'
	issue(url, function(err, data){
		t.ok(typeof data.assignee === 'undefined', "assignee is undefined")
		t.ok(data.state === 'Closed', url +' state is: ' + data.state)
		t.end()
	});
})

test('Scrape known issue without milestone', function(t){
	var url = '/dwyl/time/issues/154';
	issue(url, function(err, data){
	  console.log(data);
	  var d = data.entries.filter(function(item){
	    return item.id === 'issuecomment-104228711';
	  })
	  d = d[0] // there should only be one entry
		t.ok(data.state === 'Closed', url +' state is: ' + data.state)
		var dash = ' - - - - - - - - - - - - '
		var easter_egg = '\n' + dash +'>  '+ d.body +'  <' + dash +'\n'
		t.ok(d.body === 'I Love you!', url +' last comment is: '+easter_egg);
		t.end()
	});
})
