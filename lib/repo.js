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
function repo($, url, callback) {
  var data = { "url": url, type: 'repo' };
  data.description = $('readme-toc article').text().trim();
  const forkedfrom = $('meta[name="octolytics-dimension-repository_parent_nwo"]').attr('content');
  if (forkedfrom) {
    data.forkedfrom = `/${forkedfrom}`;
  }

  var usedby = $(".social-count")
  let tags = [];
  $('.topic-tag').each(function() {
    let topic = $(this).text().trim();
    tags.push(topic);
  });

  data.tags = tags.join(', ');

  data.usedby = parse_int($('.social-count').text());
  const starsElemId = "#repo-stars-counter-star";
  const forkElemId = "#repo-network-counter";

  data.watchers = parse_int($('a[href$="/watchers"] strong').last().text());
  data.stars = parse_int($(starsElemId).text()); // title for more accurate info
  data.forks = parse_int($(forkElemId).text());
  //  data.forks    = parse_int(badges['2'].children[0].data);
  data.commits = parse_int($('a[href$="/commits/main"] strong').first().text());
  // data.commits  = parse_int($('.commits .num').text());
  data.branches = parse_int($('.octicon-git-branch').next().text());
  data.releases = parse_int($('.octicon-tag').next().text());
  data.langs = []; // languages used in the repo:
  const languageHeader = $('h2').filter(function () {
    return $(this).text().trim() === 'Languages';
  });

  // Navigate to the subsequent <ul> element
  const languageList = languageHeader.nextAll('ul').first();

  // Extract language data
  languageList.find('li').each(function () {
    const languageName = $(this).find('span.color-fg-default.text-bold.mr-1').text().trim();
    const languagePercentage = $(this).find('span').last().text().trim();

    data.langs.push(`${languageName} ${languagePercentage}`);
  });
  return callback(null, data)
}

module.exports = repo;
