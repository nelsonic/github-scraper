var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * issue method scrapes a given GitHub repository's issues list
 * @param {string} repo - a valid GitHub repository in the format {user}/{project}
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {array} list - list of (Public) GitHub issues (for the repo)
 */
function issues (repo, callback) {
  if(!repo || repo.length === 0 || typeof repo === 'undefined'){
    return callback(400);
  }
  var url = 'https://github.com/' + repo + '/issues'
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var list = { entries : [] }; // the list we will return
      var $ = cheerio.load(html);
      // meta data for the issues page
      var links = $('.table-list-header-toggle > a')
      list.open = parseInt(links['0'].children[2].data.trim().replace('Open', ''), 10);
      list.closed = parseInt(links['1'].children[2].data.trim().replace('Open', ''), 10);
      console.log(list.open, list.closed);
      // extract all the issues on this page!
      var items = $('.table-list-item');
      for(var i = 1; i < items.length; i++) {
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
        // labels
        var labels = $(parent + '.labels > a') // .first().text() //.first()['0'].children
        var l = []; // only the label text!
        for(var j = 0; j < labels.length; j++) {
          // console.log(labels[j].children[0].data.trim())
          l.push(labels[j].children[0].data.trim());
        }
        o.labels = l;
        // console.log(l)
        list.entries.push(o);
        // pagination (if there are multiple pages of issues)
        var next = $('.next_page')
        if(next.length > 0) {
          list.next = next['0'].attribs.href;
        }

      }
      return callback(error, list)
    }
  });
}

module.exports = issues;
