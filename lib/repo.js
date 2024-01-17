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
  data.description = $('.Layout-sidebar .f4').first().text().trim();
  data.website  =$('.Layout-sidebar .octicon-link').parent().text().trim();

  var badges = $('.social-count');
  var forkedfrom = $(`${selectors.FORKED_FROM}`).text();
  if (forkedfrom) {
   
    data.forkedfrom = forkedfrom;
  }

  data.tags = []
  $(`${selectors.TOPIC_TAG}`)
  .each(function(i,a){
    data.tags.push($(this).text().trim())
  })

  data.usedby = parse_int($('.hx_flex-avatar-stack').next().text().trim());
  data.watchers = parse_int(strip($('.octicon-eye').parent().text().trim()));
  data.stars    = parse_int(strip($('.Layout-sidebar .octicon-star').parent().text().trim()));
  data.forks    = parse_int(strip($('.Layout-sidebar .octicon-repo-forked').parent().text().trim()));
  // Commits are now client-side rendered by React. 🤦‍♂️
  // data.commits  = parse_int($('.octicon-history').parent().text().trim());
  // Branches failing ... https://github.com/nelsonic/github-scraper/issues/126
  // console.log($('.Layout-main .octicon-git-branch'))
  // data.branches = parse_int($('.Layout-main .octicon-git-branch').parent().next().text());
  // data.releases = parse_int($('.octicon-tag').next().text());
  
  data.langs = []; // languages used in the repo:
  $('.Layout-sidebar .list-style-none').last().find("a")
  .each(function(i,e){
    data.langs.push({
      name:$(this).find('span').first().text(),
      perc:$(this).find('span').last().text()
    })
   
  })
  // console.log(data)
  return callback(null, data)
}

module.exports = repo;

function strip(str) {
  return str.split('\n')[0]
}