'use strict';

require("env2")(".env"); // ensure JWT_SECRET environment variable is defined.
const http = require('https'); // ALWAYS use TLS over the internets!
const jwt = require('jsonwebtoken');
/**
 * simple_http_request is a bare-bones http request using node.js core http
 * see: https://nodejs.org/api/http.html#http_http_request_options_callback
 * @param {Object} json - the JSON data we want to send to the Phoenix App.
 * @param {Function} callback - a standard callback with error & response args
 * response is a JSON Object unless there is an error. No error handling yet ...
 */

module.exports = function simple_http_request (json, callback) {
  const options = { // the json data is included in the token! 😮
    headers: {
      'Authorization': jwt.sign(json, process.env.JWT_SECRET),
      'Accept': 'application/json'
    },
    hostname: process.env.EMAIL_APP_URL, // e.g: phemail.herokuapp.com
    method: 'POST', // HTTP post sans body: stackoverflow.com/questions/4191593
    port: '443',
    path: '/api/sns' // the API endpoint that processes and stores SNS data
  }

  http.request(options, function (res) {
    let resStr = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      resStr += chunk;
    }).on('end', function () {
      return callback(res.statusCode, JSON.parse(resStr));
    });
  })
  // .on('error', (e) => {
  //   console.error(`problem with request: ${e.message}`);
  // })
  .end();
};
