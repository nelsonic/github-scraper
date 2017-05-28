// list of people who have starred a dwyl repository
var gs = require('../lib');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var data_dir = path.resolve('./', 'data');
console.log('data_dir:', data_dir );
var repo = 'dwyl/learn-tdd'
var dir = path.normalize(data_dir +'/' + repo);

// don't panic this will *always* finish before the http request!
mkdirp(dir, function (err) {
  console.log('err:', err);
  console.log('created (or updated):', dir);
});

var page = 'stargazers';
var url = repo + '/' + page;


function process_results(err, data) {
  if(err){
    console.log(err);
    return;
  }

  // console.log(data);
  write_lines(data);
  if(data.next_page) {
    gs(data.next_page, process_results);
    // console.log(data.next_page);
  }
}

function parse_file(filename) {
  var data = fs.readFileSync(filename).toString();
  console.log(data);
  var rows = data.split('\n');
  console.log(rows);
  // rows.forEach()
}


// write lines to file
function write_lines(data) {
  var timestamp = Date.now();
  var filename = dir + '/' + page + '.csv'
  parse_file(filename);
  // console.log(timestamp);
  var str = data.entries.map(function(entry) {
    return timestamp + ',' + entry
  }).join('\n') + '\n'
  // console.log(str);
  fs.appendFile(filename, str, function (err, res) {
    console.log(err, res);
    console.log('wrote ' + data.entries.length + ' lines to: ' + filename);
  });
}


// run first time
gs(url, process_results);
