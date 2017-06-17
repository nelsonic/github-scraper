var fs = require('fs');
var gs = require('../lib');
var stars = require('./stars-recursive-scrape-save.js');
var NEXT_PAGE_LIST = stars.NEXT_PAGE_LIST; // to be re-factored!

var org = 'dwyl/';
gs(org, process_org_page);

function process_org_page(err, data) {
  if(data && data.entries) {
    data.entries.forEach(function (repo) {
      stars(org + repo.name);
    })
    if(data.next_page) {
      // gs(data.next_page, process_org_page);
      stars.save_next_page(data.next_page);
    }
  }
  else {
    console.log(data);
  }
}



function crawl_next() {
  fs.readFile(NEXT_PAGE_LIST, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      var url = data.split('\n')[0];
      var linesExceptFirst = data.split('\n').slice(1).join('\n');
      fs.writeFile(NEXT_PAGE_LIST, linesExceptFirst);
    }
    if(url.indexOf('/dwyl?') > -1) { // org page
      gs(url, process_org_page);
    }
    else {
      stars(url);
    }
  });
}

var interval = setInterval(function(){
  crawl_next();
}, 2000);
