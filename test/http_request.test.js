var http_request = require('../lib/http_request');
var test = require('tape');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";

test('make GET request to invalid url (error branch check) EXPECT RED:', function (t) {
  var path = '/' + Math.floor(Math.random() * 1000000000000000);
  http_request(path, function (e, res) {
    t.equal(e, 404);
    t.end();
  });
});

test('make GET request to invalid url (error branch check)', function (t) {
  var path = '/nelsonic' ;
  http_request(path, function (statusCode, html) {
    // console.log(statusCode, html);
    t.equal(statusCode, 200, 'statusCode for valid request is: ' + statusCode);
    t.ok(html.indexOf('<!DOCTYPE html>') > -1, 'got html back from GitHub');
    t.end();
  });
});

// see: https://github.com/nelsonic/github-scraper/issues/60
var validate = require('../lib/url_validator');

test('Regression Test for issue #60', function(t) {
  var path = '/hangouts/followers';
  http_request(path, function (statusCode, html) {
    t.equal(statusCode, 200, 'statusCode for valid request is: ' + statusCode);
    t.ok(html.indexOf('<!DOCTYPE html>') > -1, 'got html back from GitHub');
    t.end();
  });
});
