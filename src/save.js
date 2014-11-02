var fs = require('fs');
var path = require('path');

var folder = './data/';
var ext = '.json';

// open the json file
function open (user, callback) {
  var filename = path.normalize(folder+user+ext);
  fs.readFile(filename, 'utf8', function(err, data){
    callback(err, data);
  });

}

function save (user, profile, callback){
  var filename = path.normalize(folder+user+ext);
  fs.writeFile(filename, JSON.stringify(profile, null, '\t'), function (err) {
    callback(err, user +ext +' saved');
  });
}

function erase (user, callback){
  var filename = path.normalize(folder+user+ext);
  var renamed  = path.normalize(folder+'__'+user+ext);
  fs.rename(filename, renamed, function (err) {
    callback(err, user+' deleted');
  });
}

function lastUpdated (user, callback){
  var filename = path.normalize(folder+user+ext);
  // check when the last time we crawled a user profile
  // by reading the mtime on the file
  fs.stat(filename, function(err, stats){
    if(err) { // file doesn't exist
      return callback(err, 0);
    }
    var mtime = new Date(stats.mtime);
    var now = new Date();
    var diff = Number(now.getTime()-mtime.getTime());
    callback(err, diff);
  });
}

// save list of users users.json to file
function saveUsers (users, callback) {
  var filename = path.normalize(folder+'users'+ext);
  users = users.filter(function() { return true; }); // remove undefined
  fs.writeFile(filename, users.join('\n'), function (err) {
    // console.log('Saved ', users.length, 'users')
    callback(err, 'saved');
  });
}

module.exports = {
  save: save,
  open: open,
  erase: erase,
  lastUpdated: lastUpdated,
  saveUsers: saveUsers
}
