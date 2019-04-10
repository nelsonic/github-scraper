var test     = require('tape');
var switcher = require('../lib/switcher');
var dir  = __dirname.split('/')[__dirname.split('/').length-1];
var file = dir + __filename.replace(__dirname, '') + " > ";

test(file + 'Attepmt to invoke the scraper WITHOUT VALID callback funciton',
  function(t) {
  var cberrmsg = "callback is required"
  try {
    switcher();
  } catch (error){
    // console.log(error);
    t.ok(error.indexOf(cberrmsg) > -1, "Got ERROR: "+error + " (as expected!)");
    t.end();
  }
})

test(file + 'Force switcher error by not setting the url', function(t){
	var url;
	switcher(url, function(err, data){
    t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.end();
	})
})

test(file + 'Try to break switcher by supplying non-existent user', function(t){
	var url = '/' + Math.floor(Math.random() * 1000000000000000);
	switcher(url, function(err, data){
    t.ok(err === 404, 'Got 404 Error when username does not exist');
		t.end();
	})
})

test.skip('Scrape a user profile supplying only the username', function(t){
  var url = 'iteles'
  switcher(url, function(err, data) {
    t.ok(data.followercount > 40, '@'+url+'has '+data.followercount+' followers')
		console.log(' - - - - - - - - - - - - - - - - - - - - -')
    console.log(data);
		console.log(' - - - - - - - - - - - - - - - - - - - - -')
    t.end()
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

// var url = 'https://github.com/alanshaw/followers'
// switcher(url, function(err, data) {
//   console.log(data);
// });

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
