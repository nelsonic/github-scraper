var fs = require('fs');
// var scrape = require('./profile.js');

// var user = 'alanshaw';
// scrape.profile(user, function (err, s) {
//   if(err){
//     console.log(err);
//   } else {
//
//     save(user, s, function(err, log){
//       console.log(log);
//     })
//   }
// });

// open the json file
function open (user, callback) {
  var filename = './data/'+user+'.log';
  fs.readFile(filename, 'utf8', function(err, data){
    callback(err, data);
  });

}

function save (user, profile, callback){
  var filename = './data/'+user+'.log';
  fs.writeFile(filename, JSON.stringify(profile)+'\n', function (err) {
    if (err) {
      throw err;
    }
    var log = user +'.log saved';
    callback(err, log);
  });
}

module.exports = {
  save: save,
  open: open
}


// cleanup(user); // remove user from users array (dont re-crawl)
// saveUsers(users);
// log = log + ' | Users:' + users.length;
