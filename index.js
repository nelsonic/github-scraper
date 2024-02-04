require("env2")(".env");
const debug = require("./lambda/debug.js");

exports.handler = function handler (event, context, callback) {
  console.log(event);
  debug(event);
  return callback(null, event);
}