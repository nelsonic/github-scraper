var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * org method scrapes a given GitHub organisation
 * @param {string} orgname - a valid GitHub orgname
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - the basic organsiation data
 */
function org(orgname, callback) {
  // console.log(orgname);
  if(!orgname || orgname.length === 0 || typeof orgname === 'undefined'){
    return callback(400);
  }
  var url, baseUrl = 'https://github.com';
  if(orgname.indexOf('page=') > -1) { // e.g: /dwyl?page=2
    url = baseUrl + orgname;       // becomes https://github.com/dwyl?page=2
  }
  else {
    url = baseUrl + '/' + orgname; // becomes https://github.com/dwyl
  }
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      // org stats
      var $ = cheerio.load(html);
      var data = { repos : [] };
      data.name = $('.org-name').first().text().trim();
      data.desc = $('.org-description').first().text().trim();
      var email = $('span[itemprop=email]');
      if(email.length > 0) {
        data.email = email.first().text().trim();
      }
      var location = $('span[itemprop=location]');
      if(location.length > 0) {
        data.location = location[0].attribs.title;
      }
      var url = $('span[itemprop=url]');
      if(url.length > 0){
        data.url = url[0].attribs.title;
      }
      data.pcount = parseInt($('.pagehead-tabs-item .counter').first().text(), 10);
      data.avatar = $('.org-header-wrapper > img')[0].attribs.src;
      // list of repos
      var items = $('.repo-list-item');
      for(var i = 2; i < items.length+2; i++) {
      // console.log(items[1])
        var r = {i:i}; // individual issue object
        var parent = '.repo-list-item:nth-child(' +i +') ';
        r.name = $(parent + '.repo-list-name').first().text().trim();
        r.desc = $(parent + '.repo-list-description').first().text().trim();
        r.updated = $(parent + '.repo-list-meta > time')[0].attribs.datetime;
        r.lang =  $(parent + 'span[itemprop=programmingLanguage]').first().text().trim();
        var stats = parent + '.repo-list-stat-item'
        r.stars = $(stats)[0].children[0].next.next.data.trim();
        r.forks = $(stats)[1].children[0].next.next.data.trim();
        data.repos.push(r);
      }
      var next = $('.next_page')
      if(next.length > 0) {
        data.next = next['0'].attribs.href;
      }
      callback(null, data);
    }
  });
}

module.exports = org
