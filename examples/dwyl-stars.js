// list of people who have starred a dwyl repository
var gs = require('../lib');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');
// var shrug = '¯\_(ツ)_/¯'; // see: https://emojipedia.org/shrug/

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
  return data.split('\n').map(function (row) {
    if(row.length > 1) {
      var username = row.split(',')[1]
      return username;
    }
  });
}


// write lines to file
function write_lines(data) {
  var timestamp = Date.now();
  var filename = dir + '/' + page + '.csv'
  var existing = parse_file(filename);
  // console.log(existing)
  // console.log(existing.length, existing[0]);
  // console.log(timestamp);
  var rows = data.entries.map(function(entry) {
    var inlist = existing.indexOf(entry);
    // console.log('entry:', entry, ' inlist:', inlist)
    if(inlist === -1) {
      return timestamp + ',' + entry
    } else {
      console.log(entry + ' already in list on line:', inlist)
      return;
    }
  }).filter(function(n){ return n != undefined });

  if (rows.length > 1) {
    var str = rows.join('\n') + '\n'; // end file with new line
    fs.appendFile(filename, str, function (err, res) {
      console.log(err, res);
      console.log('wrote ' + data.entries.length + ' lines to: ' + filename);
    });
  } else {
    console.log('no new faces')
  }
}


// run first time
gs(url, process_results);
