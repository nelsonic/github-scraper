var gs = require('../lib');
var stars = require('./stars-recursive-scrape-save.js')

var org = 'dwyl/';
gs(org, process_org_page);

function process_org_page(err, data) {
  if(data && data.entries) {
    data.entries.forEach(function (repo) {
      stars(org + repo.name);
      if(data.next_page) {
        // gs(data.next_page, process_org_page);
      }
    })
  }
  else {
    console.log(data);
  }
}
