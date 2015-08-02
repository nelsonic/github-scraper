var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * profile method scrapes a given GitHub user profile
 * @param {string} url - a valid GitHub issue url
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - the complete issue contents
 */
module.exports = function issue(url, callback) {
  if(!url || url.length === 0 || typeof url === 'undefined'){
    return callback(400);
  }
  wreck.get('https://github.com' + url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {

      var $ = cheerio.load(html);
      // generic raw data object
      var data = { entries : [], labels : [], participants : [] };
      data.url = url;
      data.title = $('.js-issue-title').first().text().trim();
      data.status = $('.state').first().text().trim();
      data.author = $('.gh-header-meta .author').first().text().trim();
      data.created  = $('.gh-header-meta time')[0].attribs.datetime;

      // labels
      $('.label').each(function(){
        data.labels.push($(this).attr('title'));
      })
      data.milestone = $('.milestone-name')[0].attribs.title
      var assignee = $('.sidebar-assignee img');
      if(assignee.length > 0){
        data.assignee = assignee[0].attribs.alt.replace('@', '');
      }

      //participants
      $('.participant-avatar').each(function(){
        data.participants.push($(this).attr('aria-label'));
      })

      // entries
      var items = $('.comment');
      // NOTE: this is the most messed up DOM structure ever!
      // its almost as if someone @GitHub is deliberately trying ot prevent crawlers!
      var entries = $('.comment:nth-child(2)');
      console.log(entries)
      for(var i=0; i < entries.length; i++) {
        var id = entries[i].attribs.id
        var entry = {"id":id};
        entry.author = $('#'+id+' .author').attr('href').replace('/','');
        entry.created = $('#'+id+' time').attr('datetime');
        entry.body = $('#'+id+' .comment-body').first().text().trim();

        data.entries.push(entry);
      }
      callback(null, data);
    }
  });
}
