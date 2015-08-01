// var profile = require('./lib/profile');
// profile('tj', function(err, profile){
//   console.log(profile);
// })

// var repos = require('./lib/repos');
// repos('iteles', function(err, list){
//   console.log(list);
// })

 // var feed = require('./lib/feed');
// feed('nelsonic', function(err, list){
//   console.log(err);
//   console.log(list, list.entries.length)
//
// })

// var repo = require('./lib/repo');
// repo('nelsonic/adoro', function(err, stats){
//   console.log(stats);
// })

// var issues = require('./lib/issues');
// issues('dwyl/tudo', function(err, list){
//   console.log(list);
// })

// var issues = require('./lib/issues');
// issues('dwyl/ignored', function(err, list){
//   console.log(list);
// })

// var issues_search = require('./lib/issues_search');
// var options = { username : 'iteles' };
// issues_search(options, function(err, list){
//   console.log(list);
// })

// var labels = require('./lib/labels');
// labels('dwyl/tudo', function(err, list){
//   console.log(list);
// })

var repo = 'dwyl/tudo'
// // var repo = 'rethinkdb/rethinkdb'
// var milestones = require('./lib/milestones');
// milestones(repo, function(err, list){
//   console.log(list);
// })

// var orgname = 'dwyl';
// // var orgname = 'rethinkdb';
// var orgname = 'github';
// var org = require('./lib/org');
// org(orgname, function(err, data){
//   console.log(data);
// });

// var username = 'iteles';
// var username = 'pgte';
// var followers = require('./lib/followers');
// followers(username, function(err, data){
//   console.log(data);
//   console.log(data.followers.length)
//   followers(data.next, function(err2, data2){
//     console.log(data2.followers.length);
//   })
// });

// var username = 'Marak';
// var following = require('./lib/following');
// following(username, function(err, data){
//   console.log(data);
//   console.log(data.following.length)
//   following(data.next, function(err2, data2){
//     console.log(data2.following.length, data2.next);
//
//   })
// });

var repo = 'nelsonic/practical-js-tdd';
var stars = require('./lib/stars');
stars(repo, function(err, data){
  console.log(data);
  console.log(data.stars.length)
  // stars(data.next, function(err2, data2){
  //   console.log(data2.starers.length, data2.next);
  // })
});
