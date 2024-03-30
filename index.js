require("env2")(".env");
const debug = require("./lambda/debug.js");
const gs = require('github-scraper');

exports.handler = function handler (event, context, callback) {
  console.log(event);
  console.log("Hi Friends!")
  debug(event);

  const url = 'dwyl';
  gs(url, function(err, data) {
    console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ')
    console.log(data);
  
    return callback(null, event);
  });
}