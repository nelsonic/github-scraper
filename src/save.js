var fs = require('fs');
var path = require('path');

// open the json file
function open (user, callback) {
  var filename = path.normalize('./data/'+user+'.log');
  fs.readFile(filename, 'utf8', function(err, data){
    callback(err, data);
  });

}

function save (user, profile, callback){
  var filename = path.normalize('./data/'+user+'.log');
  fs.writeFile(filename, JSON.stringify(profile, null, '\t'), function (err) {
    callback(err, user +'.log saved');
  });
}

module.exports = {
  save: save,
  open: open
}
