var wreck   = require('wreck');
var cheerio = require('cheerio');
var validate = require('./url_validator');

var scrapers = require('./scrapers');

module.exports = function switcher (url, callback) {
  var scraper; // the method we will use below
  url = validate(url, callback);
  console.log('\n- - - - - - - - - - - - - - - - - - - - - - - - - - URL:')
  console.log(url);
  console.log('- - - - - - - - - - - - - - - - - - - - - - - - - - - - \n')

  // centralised request issuer/hander
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var $ = cheerio.load(html);
      // in the case of username or orgname urls (which have exactly the same format!)
      // we need to fetch the page before we can tell which scraper to use
      if($('.vcard-username').length > 0){
        scraper = scrapers['profile'];
      } else {
        scraper = scrapers['org'];
      }
      if(url.match(/followers|following|stargazers/)){
        console.log('FOLLOWERS|FOLLWING|stargazers')
        scraper = scrapers['followers']; // html/DOM is identical for these 3 pages!
      }
      scraper($, url, callback)
    }
  });
}
