require("env2")(".env");
const debug = require("./lib/debug.js");

exports.handler = function handler (event, context, callback) {
  debug(event);
  return callback(null, event);
}