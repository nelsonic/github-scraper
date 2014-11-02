// removed
var C = require('./src/');

var start = new Date.now();
C.crawlUser('alanshaw', function(err, profile){
  console.log(profile.followers['nelsonic']);
  var end = new Date.now();
  var time = end - start;
  console.log('       T: ' + time +' ms');
})
