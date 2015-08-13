var test     = require('tape');
var validate = require('../lib/url_validator');
var cberrmsg = "please supply a callback"


test('Attepmt to invoke the scraper WITHOUT VALID callback funciton', function(t) {
  try {
    var result = validate();
  } catch (error){
    console.log(error);
    t.ok(error.indexOf(cberrmsg) > -1, "Got ERROR: "+error + " (as expected!)");
    t.end();
  }
})

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

test('url_validator rejects a url containing word "undefined"', function(t) {
	validate('/undefined/followers', function(err){
    console.log(err)
  	t.ok(err, 400, 'Receive 400 Error when URL resembles "undefined" ');
  	t.end();
  });
})

test('Call scraper with full (valid) GitHub URL', function(t) {
  var url1 = 'https://github.com/iteles'
	var url2 = validate(url1, function(err){	});
  console.log(url1, url2)
	t.ok(url1 === url2, 'No change to url');
	t.end();
})

test('Confirm url validator transforms iteles/followers?page=2 into full url', function(t){
  var url  = 'iteles/followers?page=2'
  var url1 = 'https://github.com/iteles/followers?page=2'
  var url2 = validate(url1, function(err){	});
  console.log(url1, url2)
  t.ok(url1 === url2, url + ' sucessfully transformed to: '+url2);
  t.end();
})
