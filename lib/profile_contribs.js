/**
 * profile_contribs scrapes a user's GitHub Contribution Matrix
 * @param {Object} $ - a valid GitHub username
 * @param {Object} data - the complete GitHub Profile for the username
 * @returns {object} data - the complete GitHub Profile for the username
 */
module.exports = function profile($, data) {
  var c = $('.day');
  var matrix = {};
  for(var i = 0; i < c.length; i++) {
    var e = c[i].attribs; // the entry
    matrix[e['data-date']] = {
      fill: e['fill'],
      count: parseInt(e['data-count'], 10),
      x: e['x'],
      y: e['y']
    }
  }
  // console.log(matrix)
  data.contrib_matrix = matrix;
  return data;
}
