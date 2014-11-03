// removed
var C = require('./src/');

var start = Date.now();
C.crawlUser('iteles', function(err, profile){
  console.log(profile.following['nelsonic']);
  var end = Date.now();
  var time = end - start;
  console.log('       T: ' + time +' ms');
})
