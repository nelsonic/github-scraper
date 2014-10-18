var P = require('./src/profile.js');
var F = require('./src/follow.js');
var fs = require('fs');
var path = require('path');
var users = []; // GLOBAL!
var inituser = 'alanshaw'; // Patient Zero

var limit = 10; // concurrency limit
var jobs = 0;   // jobs currently running

function run() {
  console.log("Jobs Running:", jobs, ' | Available: ', limit - jobs);
  if(jobs < limit && users.length > (limit - jobs)) {
    for(var i = 0; i < limit; i++) {
      jobs++;
      // console.log(users[users.length - i])
      crawl(users[i]); // pick users off the end of list
    }
  } else {
    jobs++;
    crawl(inituser);
  }
}

function cleanup(user) {
  // remove dupes from list of users
  users = users.filter(function (v, i, a) {
    return a.indexOf (v) === i;
  }); // http://stackoverflow.com/a/14821032/1148249

  // remove undefined - http://stackoverflow.com/a/2843625/1148249
  users.filter(function(n){ return n });

  // remove the current user we are checking from list of users
  var index = users.indexOf(user);
  users = users.splice(index, 1); // http://stackoverflow.com/a/3954451/1148249

  return true;
}

// save list of users users.log to file
function saveUsers(users) {
  var filename = __dirname+'/users.log'
  fs.writeFile(filename, users.join('\n'), function (err) {
    if (err) {
      throw err;
    }
    // console.log(filename+' saved!');
    // console.log('Users:',users.length);
  });
}

function nextUser(){
  var u = users[jobs+1];
  if(typeof u === 'undefined' || u.length === 0 || u === undefined) {
    console.log( ' - - - - - - '+u +' - - - - - - -');
    cleanup(u);
    nextUser();
  } else {
    return u;
  }

}

function crawl(user) {
  console.log("User:", user)
  var filename = './data/'+user+'.log';

  P.profile(user, function(error, profile){

    // crawl list of followers
    F.followers(user, function(error, followers){
      followers.map(function(u){ users.push(u) });

      // crawl list of following
      F.following(user, function(error, following){
        following.map(function(u){ users.push(u) });
        var log = " > " + user;
        log = log + " | Followers:" + followers.length;
        log = log + " | Following:" + following.length;

        profile.following = following.join(',');
        profile.followers = followers.join(',');
        profile.last = new Date().getTime();
        fs.appendFile(filename, JSON.stringify(profile)+'\n', function (err) {
          if (err) {
            throw err;
          }
          log = log + ' | ' + filename +' saved! ';
          cleanup(user); // remove user from users array (dont re-crawl)
          saveUsers(users);
          log = log + ' | Users:' + users.length;
          console.log(log);
          jobs--;
          var u = nextUser();
          return crawl(u); // next iteration
        });
      });
    });
  })
}

function checkLastCrawled(user, callback){
  var filename = path.normalize('./data/'+user+'.log');
  console.log(filename, __filename);
  // check when the last time we crawled a user profile was
  // by reading the mtime on the file
  fs.stat(filename, function(err, stats){
    if(err) { // file doesn't exist, run crawl!
      crawl(user);
    }
    console.log(stats.mtime);
    // only check every 24 hours
    var mtime = new Date(stats.mtime);
    var now = new Date();
    var diff = Number(now.getTime()-mtime.getTime());
    console.log(now + ' - ' + mtime + ' = '+diff );

    // if the difference is bigger than 1 day crawl again.
    if(diff > 24 * 60 * 60 * 1000) {
      crawl(user);
    } else {
      cleanup(user); // remove user from users array (dont re-crawl)
      return crawl(users[0]); // next iteration
    }
  })
}

function boot(){
  // check if a users.log file exists
  var fd = __dirname+'/users.log'
  fs.readFile(fd, 'utf8', function(err, data){
    if(err){
      console.log("Users File Does not Exist");
    } else {
      users = data.toString().split('\n');
      console.log("User Count:", users.length);
    }
    run();
  })
}

boot();

// checkLastCrawled('alanshaw', function(){
//   console.log('done');
// })

// function keep going




// crawl(user);
