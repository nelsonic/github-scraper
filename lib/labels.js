/**
 * labels method scrapes a given GitHub repository's list of labels
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} url - a valid GitHub repository url {owner}/{reponame}
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error - an error object (set to null if no error occurred)
 *  @param {array} list - list of labels with colors for the GitHub repository
 */
function labels ($, url, callback) {
  var data = { entries: [], url: url };
  var items = $('.table-list-item');
  for(var i = 1; i < items.length; i++) {
    var parent = '.table-list-item:nth-child(' +i +') ';
    var link = $(parent + '.label-link')['0'];
    var label = {
      name   : $(parent + '.label-name').first().text(),
      style  : link.attribs.style.trim(),
      link   : link.attribs.href,
      count  : parseInt($(parent + '.label-description')['0'].children[0].data.replace('open issues', '').trim(), 10)
    }
    data.entries.push(label);
  }
  return callback(null, data);
}

module.exports = labels;
