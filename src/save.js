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

module.exports = {
  save: save,
  open: open,
  erase: erase
}
