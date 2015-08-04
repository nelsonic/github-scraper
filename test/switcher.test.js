var test     = require('tape');
var switcher = require('../lib/switcher');

test('Scrape a user profile supplying only the username', function(t){
  var url = 'https://github.com/alanshaw/followers'
  switcher(url, function(err, data) {
    console.log(data);
  });
})
// var url = 'https://github.com/iteles/followers'
// switcher(url, function(err, data){
//   console.log(data);
// })

// var url = 'https://github.com/alanshaw/david-www/stargazers'
// switcher(url, function(err, data) {
//   console.log(data);
// });

var url = 'https://github.com/alanshaw/followers'
switcher(url, function(err, data) {
  console.log(data);
});

// var url = 'dwyl'
// switcher(url, function(err, data) {
//   console.log(data);
// });


// var url2 = 'https://github.com/iteles/following?page=2'
// switcher(url2, function(err, data){
//   console.log(data);
// })
//
//
// var url3 = 'https://github.com/iteles/following?page=2'
// switcher(url3, function(err, data){
//   console.log(data);
// })
