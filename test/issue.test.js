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
	var url = 'dwyl/tudo/issues/' + Math.floor(Math.random() * 1000000000000000);
	issue(url, function(err, profile){
		t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.ok(typeof data === 'undefined', 'data is undefined (as expected)');
		t.end();
	})
})

// test('Check @alanshaw profile for GitHub Developer Program Membership', function(t){
// 	var user = 'alanshaw';
// 	profile(user, function(err, p) {
// 		t.ok(p.developerprogram === true, '- @' + user + ' is a member of the "GitHub Developer Program"');
// 		t.end();
// 	});
// })
