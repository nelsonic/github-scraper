module.exports = {
  feed: require('./feed'),               // activity feed (RSS)
  followers: require('./followers'),     // also scrapes following or stargazers
  issue: require('./issue'),            
  issues: require('./issues'),
  issues_search: require('./issues_search'),
  labels : require('./labels'),
  milestones : require('./milestones'),
  org: require('./org'),
  people: require('./people'),
  profile: require('./profile'),
  repo: require('./repo'),
  repos: require('./repos'),
  starred: require('./starred')
}
