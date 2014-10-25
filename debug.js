var scrape = require('./src/profile.js');
var user = 'zero';

scrape.profile(user, function (err, s) {
  console.log(' - - - - - - - - - - - Error:');
  console.log(err);
  console.log('\n - - - - - - - - - - - Response:');
  console.log(s);
});
