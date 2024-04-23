/**
 * next_page checks for pagination on a "beta" page ref #131
 * @param {Object} $ - cheerio object with DOM of page to be scraped
 * @param {Object} data - the data we have scraped from the page so far
 * @return {Object} the data object with a next_page key & value
 */
module.exports = function next_page_beta ($, data) {
  const next = $('.TablePaginationSteps').find('[class^="Pagination__Page-"]').last().attr('href');
  data.next_page = '';
  /* istanbul ignore else */
  if (next) {
    const url = data.url.split('?')[0];
    data.next_page = url + '?type=all&' + 'page=' + next.replace('#', '');
  }

  return data;
}
