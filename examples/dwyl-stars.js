// list of people who have starred a dwyl repository
var gs = require('../lib');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

// constants
var TIMESTAMP = Date.now();
var GURL = 'https://github.com/';
var BASE_DIR = path.resolve('./', 'data');
console.log('BASE_DIR:', BASE_DIR );


function main(repo) {
  var DATA_DIR = path.normalize(BASE_DIR +'/' + repo);
  mkdirp.sync(DATA_DIR); // ensure the dir exists

  var pages = ['stargazers', 'watchers'];
  pages.forEach(function (page) {
    var url = repo + '/' + page;
    gs(url, process_results);
  });
}

function process_results(err, data) {
  if (err) { return console.log(err); }
  write_lines(data);
  if(data.next_page) {
    gs(data.next_page, process_results);
  }
}

function parse_file(filename) {
  var data = fs.readFileSync(filename).toString();
  return data.split('\n').map(function (row) {
    if(row.length > 1) {
      var username = row.split(',')[1]
      return username;
    }
  });
}


// write lines to file
function write_lines(data) {
  var filepath = path.normalize(BASE_DIR +'/' +
    data.url.replace(GURL, '').split('?')[0]) + '.csv'

  fs.openSync(filepath, 'a') // "touch" file to ensure it exists
  var existing = parse_file(filepath);

  var rows = data.entries.map(function(entry) {
    if(existing.indexOf(entry) === -1) {
      return TIMESTAMP + ',' + entry;
    }
  }).filter(function (n) { return n != undefined }); // remove blanks

  if (rows.length > 1) {
    var str = rows.join('\n') + '\n'; // end file with new line
    fs.appendFile(filepath, str, function (err, res) {
      console.log('wrote ' + data.entries.length + ' lines to: ' + filepath);
    });
  } else {
    console.log('no new faces')
  }
}


// run first time
var repo = 'dwyl/learn-tdd'
main(repo);

module.exports = main;
