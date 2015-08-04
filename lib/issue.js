/**
 * profile method scrapes a given GitHub user profile
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} url - a valid GitHub issue url
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - the complete issue contents + meta data
 */
module.exports = function issue($, url, callback) {
  var data = { entries : [], labels : [], participants : [] };
  data.url = url;
  data.title = $('.js-issue-title').first().text().trim();
  data.state = $('.state').first().text().trim();
  console.log(' - - - - - > ' +data.state)
  data.author = $('.gh-header-meta .author').first().text().trim();
  data.created  = $('.gh-header-meta time')[0].attribs.datetime;

  // labels
  $('.label').each(function(){
    data.labels.push($(this).attr('title'));
  })
  var milestone = $('.milestone-name')
  if(milestone.length > 0){
    data.milestone = milestone[0].attribs.title;
  }
  var assignee = $('.sidebar-assignee img');
  if(assignee.length > 0){
    data.assignee = assignee[0].attribs.alt.replace('@', '');
  }

  //participants
  $('.participant-avatar').each(function(){
    data.participants.push($(this).attr('aria-label'));
  })

  // NOTE: this is possibly the most messed up DOM structure ever!
  // its almost as if someone @GitHub is deliberately trying ot prevent crawlers!
  var entries = $('.comment:nth-child(2)'); // yes! its bananas!
  for(var i=0; i < entries.length; i++) {
    var id = entries[i].attribs.id; // see: http://git.io/vOC5d
    var entry = {"id":id};
    entry.author = $('#'+id+' .author').attr('href').replace('/','');
    entry.created = $('#'+id+' time').attr('datetime');
    entry.body = $('#'+id+' .comment-body').first().text().trim();
    data.entries.push(entry);
  }
  return callback(null, data);
}
