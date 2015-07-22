// removed
var Profile = require('./lib/profile');
var start = Date.now();
Profile('alanshaw', function(err, profile){
  console.log(profile);
  var end = Date.now();
  var time = end - start;
  console.log('       T: ' + time +' ms');
})
