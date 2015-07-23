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
  var url = 'https://github.com/' + username + '.atom'
  wreck.get(url, function (error, response, xml) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      // console.log(xml.toString())
      var JSON = parse(xml.toString());
      console.log(JSON)
      var list = [];

      callback(error, list)
      // return callback(error, events)
    }
  });
}

module.exports = feed;


/*** sample output from xml2js.parseString :

{ comment: '',
  sgmlDecl: '',
  textNode: '',
  tagName: '',
  doctype: '',
  procInstName: '',
  procInstBody: '',
  entity: '',
  attribName: '',
  attribValue: '',
  cdata: '',
  script: '',
  c: '',
  q: '',
  bufferCheckPosition: 65536,
  opt:
   { trim: false,
     normalize: false,
     xmlns: false,
     lowercase: undefined },
  looseCase: 'toUpperCase',
  tags: [],
  sawRoot: false,
  closedRoot: false,
  closed: false,
  error: null,
  tag: null,
  strict: true,
  noscript: true,
  state: 0,
  ENTITIES: {},
  attribList: [],
  trackPosition: true,
  column: 0,
  line: 0,
  position: 0,
  errThrown: false,
  onerror: [Function],
  ended: true,
  onopentag: [Function],
  onclosetag: [Function],
  ontext: [Function],
  oncdata: [Function],
  startTagPosition: 62258 }

**/
