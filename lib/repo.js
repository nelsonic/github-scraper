const parse_int = require('../lib/utils').parse_int;
const selectors=require('../config/repos')

/**
 * repo method scrapes a given GitHub repository page
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {string} project - a valid GitHub repository name
 * @param {function} callback - the callback we should call after scraping
 *  a callback passed into this method should accept two parameters:
 *  @param {object} error - an error object (set to null if no error occurred)
 *  @param {array} data - list of (Public) information on the GitHub repository
 */
function repo ($, url, callback) {

  var data = { "url" : url, type: 'repo'};
  data.description = $(`${selectors.LANGUAGES}`).first().find("p").text();
  data.website  =$(`${selectors.LANGUAGES}`).first().find("span a").text();

  var badges = $('.social-count');
  var forkedfrom = $(`${selectors.FORKED_FROM}`).text();
  if (forkedfrom) {
   
    data.forkedfrom = forkedfrom;
  }

  

  data.tags = []
  data.usedby = parse_int($('.social-count').text());
  data.watchers = parse_int(badges['0'].children[0].data);
  data.stars    = parse_int(badges['1'].children[0].data);
  data.forks    = parse_int(badges['2'].children[0].data);
  data.commits  = parse_int($(`${selectors.COMMIT}`).first().text());
  data.branches = parse_int($('.octicon-git-branch').next().text());
  data.releases = parse_int($('.octicon-tag').next().text());
  data.langs = []; // languages used in the repo:
  $(`${selectors.LANGUAGES}`).first().find(`${selectors.TOPIC_TAG}`)
  .each(function(i,a){
    data.tags.push($(this).text().trim())
  })
  $(`${selectors.LANGUAGES}`).last().find("a")
  .each(function(i,e){
    data.langs.push({
      name:$(this).find('span').first().text(),
      perc:$(this).find('span').last().text()
    })
   
  })
  console.log(data.langs)
  return callback(null, data)
}

module.exports = repo;
