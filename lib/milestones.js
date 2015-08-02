var wreck   = require('wreck');
var cheerio = require('cheerio');

/**
 * milestones method scrapes a given GitHub repository's list of milesontes
 * @param {string} project - a valid GitHub repository name
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error - an error object (set to null if no error occurred)
 *  @param {array} list - list of milestones with colors for the GitHub repository
 */

function milestones (project, callback) {
  if(!project || project.length === 0 || typeof project === 'undefined'){
    return callback(400);
  }
  var url = 'https://github.com' + project +'/milestones'
  console.log(url);
  wreck.get(url, function (error, response, html) {
    if (error || response.statusCode !== 200) {
      callback(response.statusCode);
    }
    else {
      var $ = cheerio.load(html);
      var result = { entries : [] };
      // .states gives us the number of open vs. closed milestones
      var states = $('.states > a > span');
      result.open = parseInt(states[0].next.data.replace('Open','').trim(), 10);
      result.closed = parseInt(states[1].next.data.replace('Closed','').trim(), 10);

      $('.table-list-item').each(function (i) {
        var milestone = {
          name     : $(this).find('.milestone-title-link').first().text().trim(),
          due      : $(this).find('.milestone-meta-item:nth-child(1)').text().trim(),
          updated  : $(this).find('.milestone-meta-item:nth-child(2)').text().trim(),
          desc     : $(this).find('.milestone-description-html').first().text().trim(),
          progress : $(this).find('.progress-percent').first().text().trim(),
          open   : parseInt($(this).find('.stat:nth-child(2)').first().text().replace('open','').trim(), 10),
          closed : parseInt($(this).find('.stat:nth-child(3)').first().text().replace('closed','').trim(), 10),
        }
        result.entries.push(milestone);
      });
      return callback(error, result)
    }
  });
}

module.exports = milestones;
