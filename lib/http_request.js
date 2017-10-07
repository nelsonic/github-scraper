'use strict';

var http = require('https'); // ALWAYS use TLS over the internets!
var bgRedBlack = '\x1b[41m\x1b[30m';
var RESET = '\x1b[0m'; // see: https://stackoverflow.com/a/41407246/1148249
/**
 * simple_http_request is a bare-bones http request using node.js core http
 * see: https://nodejs.org/api/http.html#http_http_request_options_callback
 * the NPM request module is 3.6 Megabytes and offers v. little benefit ...
 * This code achieves the same in less than 1kb. less code = faster response.
 * @param {Object} path - the path (on GitHub) we want to "view"
 * @param {Function} callback - a standard callback with error & response args
 * response is a JSON Object unless there is an error.
 */

module.exports = function simple_http_request (path, callback) {

  var options = {
    headers: {
      'Accept': 'text/html',
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36'
    },
    hostname: 'github.com',
    port: '443',
    path: path
  }

  http.request(options, function (res) {
    var resStr = '';
    var response;
    // console.log(res.statusCode);
    if (res.statusCode !== 200) {
      console.log(bgRedBlack, ' GOT ', res.statusCode, ' for ', options, RESET);
      return callback(res.statusCode);
    }

    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      // console.log(chunk);
      resStr += chunk;
    }).on('end', function () {
      return callback(res.statusCode, resStr); // return response as HTML!
    });

    return true;
  }).end();

};
