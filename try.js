// removed
var C = require('./src/');

var start = Date.now();
C.crawlUser('nodecoder', function(err, profile){
  console.log(profile.followers['nelsonic']);
  var end = Date.now();
  var time = end - start;
  console.log('       T: ' + time +' ms');
})
