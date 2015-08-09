/**
 * org method scrapes a given GitHub organisation
 * @param {string} orgname - a valid GitHub orgname
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - the complete organsiation data
 */
function org($, url, callback) {
  var data = { entries : [], url: url };
  data.name     = $('.org-name').first().text().trim();
  data.desc     = $('.org-description').first().text().trim();
  if($('span[itemprop=location]').length > 0){
    data.location = $('span[itemprop=location]')[0].attribs.title;
  }
  if($('a[itemprop=url]').length > 0){
    data.website  = $('a[itemprop=url]')[0].attribs.title;
  }
  if($('a[itemprop=email]').length > 0){
    data.email    = $('a[itemprop=email]').first().text().trim();
  }
  var people  = $('.pagehead-tabs-item .counter')
  data.pcount = parseInt(people.first().text(), 10);
  data.avatar = $('.org-header-wrapper img')[0].attribs.src;
  // list of repos
  var items = $('.repo-list-item');
  for(var i = 2; i < items.length+2; i++) {
    var r      = {}; // repository object
    var parent = '.repo-list-item:nth-child(' +i +') ';
    r.name     = $(parent + '.repo-list-name').first().text().trim();
    r.desc     = $(parent + '.repo-list-description').first().text().trim();
    r.updated  = $(parent + '.repo-list-meta time')[0].attribs.datetime;
    r.lang     = $(parent + 'span[itemprop=programmingLanguage]').first().text().trim();
    var stats  = parent + '.repo-list-stat-item'
    r.stars    = $(stats)[0].children[0].next.next.data.trim();
    r.forks    = $(stats)[1].children[0].next.next.data.trim();
    data.entries.push(r);
  }
  data = require('./next_page')($, data); // don't worry this gets cached ;-)
  callback(null, data);
}

module.exports = org
