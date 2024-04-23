'use strict';
require('env2')('.env');
const AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
var s3 = new AWS.S3({params: {Bucket: process.env.AWS_S3_BUCKET}});

/**
 * `save` saves a JSON object to S3.
 * if you need to specify the file name, use `json.key`
 * @param {Object} json - the object we want to store on S3
 * @param {Function} callback - called once the file has been uploaded
 */
module.exports.save = function save (json, callback) {
  if (json) {
    const filename = json.key || 'event'
    const params = {
      Key: filename + '.json',
      Body: JSON.stringify(json),
      ContentType: 'application/json',
      ACL: 'public-read'
    };

    s3.upload(params, function (err, data) {
      if (callback && typeof callback === "function") {
        return callback(err, data);
      }
      else {
        return data;
      }
    });

  } else {
    return callback('ERROR: please provide json data');
  }
}

/**
 * `get` retrieves and parses a JSON file from S3
 * this function is only used to test that the `save` method.
 * @param {String} key - the filename of the object to get from S3
 * @param {Function} callback - called once the file has been uploaded
 */
module.exports.get = function get (key, callback) {
  s3.getObject({Key: key}, function (error, data) {
    if (error) {
      return callback(error);
    }
    else {
      return callback(error, JSON.parse(data.Body.toString()));
    }
  });
};
