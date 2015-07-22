// var Profile = require('./lib/profile');
// Profile('alanshaw', function(err, profile){
//   console.log(profile);
// })

var repositories = require('./lib/repositories');
repositories('iteles', function(err, repos){
  console.log(repos);
})
