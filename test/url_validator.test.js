var test     = require('tape');
var validate = require('../lib/url_validator');

test('Attempt to call scraper without a url (error test) ', function(t) {
	validate(null, function(err){
		t.ok(err, 400, 'Receive 400 Error when url is null');
		t.end();
	})
})

test('Attempt to call scraper with blank url', function(t) {
	validate('', function(err){
		t.ok(err, 400, 'Receive 400 Error when orgname is too short');
		t.end();
	})
})

test('Call scraper with url without leading forward slash', function(t) {
	var url = validate('iteles', function(err){	});
  console.log(url)
	t.ok(url, 400, 'Receive 400 Error when orgname is too short');
	t.end();
})

// see: https://github.com/nelsonic/github-scraper/issues/84
test('url_validator does NOT contain (perfectly valid) url containing word "undefined"', function(t) {
	var url = validate('/undefined/followers');
	var expected = '/undefined/followers';
	t.equal(url, expected, 'User "@undefined" is legit: ' +  url);
	t.end();
});

test('Call scraper with full (valid) GitHub URL', function(t) {
  var url = 'https://github.com/iteles'
	var expected = url.split('https://github.com')[1];
	var actual = validate(url, function(err){	});
  console.log(expected, actual)
	t.equal(expected, actual, 'No change to url');
	t.end();
})

test('Confirm url validator transforms iteles/followers?page=2 into full url', function(t){
  var url  = 'iteles/followers?page=2'
  // var url1 = 'https://github.com/iteles/followers?page=2'
  var url2 = validate(url, function(err){	});
  console.log(url, url2)
  t.ok('/' + url === url2, url + ' equal to: ' + url2);
  t.end();
})

// see: https://github.com/nelsonic/github-scraper/issues/60
test('Regression Test for issue #60', function(t){
  var url = 'hangouts/followers';
  var actual = validate(url, function(err){	});
  // console.log(url1, url2)
  t.ok('/' + url === actual, url + ' sucessfully transformed to: ' + actual);
  t.end();
})
