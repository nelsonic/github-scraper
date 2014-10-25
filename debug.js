var scrape = require('./src/profile.js');
var user = 'zero';

scrape.profile(user, function (err, profile) {
  console.log(' - - - - - - - - - - - Error:');
  console.log(err);
  console.log('\n - - - - - - - - - - - Response:');
  console.log(profile);
});
