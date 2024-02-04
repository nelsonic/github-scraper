'use strict';
require('env2')('.env');
const save = require('./s3.js').save;

/**
 * `debug` is used to debug SNS notification events.
 * it only gets executed if the NODE_ENV is set to "test".
 * To save event data to S3 you will need to add AWS_S3_BUCKET to .env
 * see: github.com/dwyl/aws-ses-lambda/issues/12
 * @param {Object} event - the object we want to store on S3
 */
module.exports = function debug (event) {
  // console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "test") {
    if(event.Records && !event.key) {
      event.key = "sns";
    }
    save(event, function callback (error, data) {
      console.log("DEBUG - - - error:", error, " - - - data:");
      console.log(data);
      console.log(" - - - - - - - - - - - - - - - - - - - - ");
    });
  }
};
