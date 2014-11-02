// removed
var C = require('./src/');

C.crawlUser('pgte', function(err, profile){
  console.log(profile.following['nelsonic']);
})
