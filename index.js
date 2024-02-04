// require("env2")(".env");
const debug = require("./lambda/debug.js");

exports.handler = function handler (event, context, callback) {
  debug(event);
  debug(context);
  return callback(null, event);
}