var wreck  = require('wreck');
var parse = require('xml2js').parseString;
// var sax = require('sax');

/**
 * feed method parses a given GitHub user's activity feed
 * @param {string} username - a valid GitHub username
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {array} feed - list of recent (public) activity (for the username)
 */
function feed (username, callback) {
  if(!username || username.length === 0 || typeof username === 'undefined'){
    return callback(400);
  }
  var url = 'https://github.com/' + username + '.atom';
  wreck.get(url, function (error, response, xml) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      // console.log(xml.toString())
      xml = xml.toString();
      parse(xml, function(err, JSON){
        console.log(JSON);
        var list = [];

        return callback(error, list)
      });
      // return callback(error, events)
    }
  });
}

module.exports = feed;

/*** xml2js.parseString sample output

{ feed:
   { '$':
      { xmlns: 'http://www.w3.org/2005/Atom',
        'xmlns:media': 'http://search.yahoo.com/mrss/',
        'xml:lang': 'en-US' },
     id: [ 'tag:github.com,2008:/iteles' ],
     link: [ [Object], [Object] ],
     title: [ 'iteles’s Activity' ],
     updated: [ '2015-07-22T23:31:25Z' ],
     entry:
      [ [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object] ] } }

**/
