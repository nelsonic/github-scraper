/**
 * `org_repos` parses a given GitHub organization repositories page.
 * e.g: https://github.com/orgs/dwyl/repositories?type=all
 * @param {object} $ - the cheerio DOM object.
 * @param {string} url - the url of the page to be parsed.
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {objectj} error an error object (set to null if no error occurred)
 *  @param {object} data - the complete organsiation data
 */
function org_repos($, url, callback) {
  var data = { url: url, type: 'org_repos' };
  data.name = $('h1.lh-condensed').first().text().trim();
  // data.description = $('h1.lh-condensed').parent().next().text().trim(); // yep ...¯\_(ツ)_/¯
  data.description = $('.container-xl .color-fg-muted').first().text().trim()
  // var people  = $('.Counter').eq(1); // people is *second* in list of tabs!
  // data.pcount = parseInt(people.first().text(), 10);
  // data.pcount = isNaN(data.pcount) ? 0 : data.pcount
  data.avatar = $('.avatar')[0].attribs.src;
  var parts = data.avatar.split('/');
  data.uid = parseInt(parts[parts.length-1].split('?')[0], 10);
  // list of repos
  var items = $('li.listviewitem');
  // console.log('items.length', items.length);
  data.entries = []; // avoid having circular reference objects! :-(
  items.each( function (i) { // JS counters start at 0.
    // console.log(i)
    var parent = 'li:nth-child(' + (i+1) +') '; // CSS selectors start at 1.
    console.log($(parent))
    console.log($(parent + ' .markdown-title'))
    data.entries.push({
      // feel free to add more attributes to this! 🙏
      name: $(parent + ' .markdown-title').text().trim(),
      // lang: $(parent + ' .listview-item-main-content').find('[class^="Text-"]').text().trim(),
      url: $(parent + ' a').first().attr('href'),
      description: $(parent + ' .repos-list-description').first().text().trim(),
      // updated: $(parent + ' relative-time')[0].attribs.datetime
    });
  });
  // console.log(data)

  data = require('./next_page_beta')($, data); // don't worry this gets cached ;-)
  callback(null, data);
}

module.exports = org_repos
