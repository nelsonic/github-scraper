/**
 * profile_contribs scrapes a user's GitHub Contribution Matrix
 * @param {Object} $ - a valid GitHub username
 * @param {Object} data - the complete GitHub Profile for the username
 * @returns {object} data - the complete GitHub Profile for the username
 */
module.exports = function profile($, data) {
  console.log('profile_contributions');
  console.log($('.day').length);
  return data;
}
