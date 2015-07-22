// var Profile = require('./lib/profile');
// Profile('alanshaw', function(err, profile){
//   console.log(profile);
// })

var repositories = require('./lib/repositories');
repositories('alanshaw', function(err, repos){
  console.log(repos);
})
