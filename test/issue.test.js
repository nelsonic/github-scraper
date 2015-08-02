var test  = require('tape');
var issue = require('../lib/issue');

test('attempt to scrape undefined issue (should fail)', function(t){
	var url = '';
	issue(url, function(err, data){
		t.ok(err, 400, 'Receive 400 Error when url is undefined');
		t.end();
	});
});

test('Scrape random (non-existent) issue (error test) ', function(t){
	var url = '/dwyl/tudo/issues/' + Math.floor(Math.random() * 1000000000000000);
	issue(url, function(err, profile){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof data === 'undefined', 'data is undefined (as expected)');
		t.end();
	})
})

test('Scrape /dwyl/tudo/issues/51 for all comments and meta-data', function(t){
	var url = '/dwyl/tudo/issues/51';
	issue(url, function(err, data) {
		t.ok(data.title.length > 0, url + ' has title: '+data.title);
		t.ok(data.status.length > 0, url + ' is: '+data.status);
		t.ok(data.author.length > 0, url + ' was authored by: '+data.author);
		t.ok(data.created.length > 0, url + ' was created on: '+data.created);


		console.log(data);		
		t.end();
	});
})