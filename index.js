require("env2")(".env");
const debug = require("./lambda/debug.js");

exports.handler = function handler (event, context, callback) {
  debug(event);
  debug(context);
  console.log('hello')
  return callback(null, event);
}