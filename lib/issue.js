/**
 * profile method scrapes a given GitHub user profile
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {String} url - a valid GitHub issue url
 * @param {Function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {Object} error an error object (set to null if no error occurred)
 *  @param {Object} data - the complete issue contents + meta data
 */
module.exports = function issue($, url, callback) {

  var data = { entries : [], labels : [], participants : [] };
  data.url = url;
  // console.log($('.gh-header-title'));
  data.title = $('.gh-header-title').first().text().trim().split('\n')[0];

  data.state = $('.State').first().text().trim();
  data.author = $('.gh-header-meta .author').first().text().trim();
  data.created  = $('relative-time')[0].attribs.datetime;

  // labels
  $('.IssueLabel').each(function(){
    data.labels.push($(this).attr('data-name'));
  })
  data.labels = data.labels.filter(function(i) { return i != null });
  // stackoverflow.com/questions/9229645/remove-duplicates-from-js-array
  data.labels = [...new Set(data.labels)]

  data.milestone = $('.Progress').next().text().trim();
  data.assignee = $('.assignee').text().trim();

  // participants anyone who has commented or been assigned in the issue
  $('.participant-avatar').each(function(){
    data.participants.push($(this).attr('href').replace('/',''));
  })
  // console.log(' - - - - - > data', data)
  // NOTE: this is possibly the most messed up DOM structure ever!
  // its almost as if someone @GitHub is deliberately trying to prevent crawlers


  var entries = $('.markdown-body');
  console.log('entries.length', entries.length);

  const selector = '.markdown-body:nth-child(' + 1 + ')';
  console.log('selector', selector);

  console.log($(selector).text().trim());
  // console.log(entries[0]);

  for(var i=0; i < entries.length; i++) {

    // console.log(entries[i]);
    // var id = entries[i].attribs.id; // see: http://git.io/vOC5d
    // console.log(id);
    // var entry = {"id":id};
  //   entry.author = $('#'+id+' .author').attr('href').replace('/','');
  //   entry.created = $('#'+id+' time').attr('datetime');
  //   entry.body = $('#'+id+' .comment-body').first().text().trim();
  //   data.entries.push(entry);
  }
  return callback(null, data);

}
