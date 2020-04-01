const parse_int = require('../lib/utils').parse_int;

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
  data.description = $('span[itemprop="about"]').text().trim();
  data.website  = $('span[itemprop="url"] a[rel="nofollow"]').text().trim();
  var badges = $('.social-count');
  // console.log(badges);
  var forkedfrom = $('.fork-flag > span > a').attr('href');
  if (forkedfrom) {
    data.forkedfrom = forkedfrom;
  }

  var usedby = $(".social-count")
  // console.log(usedby);

  data.tags = $('.list-topics-container').text().trim()
              .replace(/\n /g, '').replace(/ +/g,', ');
  data.usedby = parse_int($('.social-count').text());
  data.watchers = parse_int(badges['0'].children[0].data);
  data.stars    = parse_int(badges['1'].children[0].data);
  data.forks    = parse_int(badges['2'].children[0].data);
  data.commits  = parse_int($('.commits .num').text());
  data.branches = parse_int($('.octicon-git-branch').next().text());
  data.releases = parse_int($('.octicon-tag').next().text());
  data.langs = []; // languages used in the repo:
  var langs = $('.repository-lang-stats-graph .language-color');
  if(langs.length > 0){
    data.langs.push(langs['0'].attribs['aria-label']);
  }
  if(langs['1'] && langs['1'].attribs && langs['1'].attribs['aria-label']) {
    data.langs.push( langs['1'].attribs['aria-label'] );
  }
  return callback(null, data)
}

module.exports = repo;
