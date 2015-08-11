/**
 * issue method scrapes a given GitHub repository's issues list
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} url - a valid GitHub repository url in the format {user}/{project}
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - list of (Public) GitHub issues (for the repo)
 */
module.exports = function issues ($, url, callback) {
    var data = { entries : [], url: url}; // the list we will return
    // meta data for the issues page
    var links = $('.table-list-header-toggle > a')
    // console.log(links);
    if(links.length === 0){
      console.log(' - - - - - - short circuit  (no links) - - - - - -')
      return callback(404);
    }
    data.open = parseInt(links['0'].children[2].data.trim().replace('Open', '').replace(/,/, ''), 10);
    data.closed = parseInt(links['1'].children[2].data.trim().replace('Open', '').replace(/,/, ''), 10);
    // extract all the issues on this page!
    var items = $('.table-list-item');
    for(var i = 1; i < items.length + 1; i++) {
      var o = {}; // individual issue object
      var parent = '.table-list-item:nth-child(' +i +') ';
      o.url = $(parent + '.issue-title-link').first()['0'].attribs.href;
      o.title = $(parent + '.issue-title-link').first()['0'].children['0'].data.trim()
      o.created = $(parent + 'time')['0'].attribs.datetime
      o.author = $(parent + '.muted-link')['0'].children[0].data.trim();
      o.comments = parseInt($(parent + '.issue-comments > a').first().text().trim(), 10);
      // assignee extraction only if assigned
      var img = $(parent + '.table-list-cell-avatar .tooltipped-n > img')
      if(img.length > 0) {
        o.assignee = img['0'].attribs.alt.replace('@','')
      }
      // milestone if one is set
      var milestone = $(parent + '.css-truncate-target');
      if(milestone.length > 0) {
        o.milestone = milestone['0'].children[0].data.trim()
      }
      var labels = $(parent + '.labels > a');
      var l = []; // only the label text!
      for(var j = 0; j < labels.length; j++) {
        l.push(labels[j].children[0].data.trim());
      }
      o.labels = l;
      data.entries.push(o);
    }
    data = require('./next_page')($, data); // don't worry this gets cached ;-)
    return callback(null, data);
}
