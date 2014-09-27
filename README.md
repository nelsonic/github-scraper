# Untitled Pet Project

[![Build Status](https://travis-ci.org/nelsonic/fuata.png?branch=master)](https://travis-ci.org/nelsonic/fuata)
[![Coverage Status](https://coveralls.io/repos/nelsonic/fuata/badge.png)](https://coveralls.io/r/nelsonic/fuata)
[![Code Climate](https://codeclimate.com/github/nelsonic/fuata.png)](https://codeclimate.com/github/nelsonic/fuata)
[![Dependencies](https://david-dm.org/nelsonic/fuata.png?theme=shields.io)](https://david-dm.org/nelsonic/fuata)
[![devDependency Status](https://david-dm.org/nelsonic/fuata/dev-status.svg)](https://david-dm.org/nelsonic/fuata#info=devDependencies)
<!-- [![NPM version](https://badge.fury.io/js/fuata.png)](https://npmjs.org/package/fuata) -->


# *Who* Should I Follow?

Have you ever wanted to know who are the **best people** online
**to follow** and ***why***?

- Who posts interesting content and who doesn't?
- Who is "**trending**" and ***why***?

I wonder this all the time.
So I'm building [***fuata***](https://translate.google.com/#auto/en/fuata)
(working title) to [***scratch my own itch***](https://gettingreal.37signals.com/ch02_Whats_Your_Problem.php).

# Data Model

I expect to store a couple of hundred (million) records in the database.

- fullName
- @username
- dateJoined

Followers
- followingUsername
- @username
- dateFollowed
- dateUnfollowed


Example data structure:
(nested Objects are easier for data updates)
```js
{
  "followers": {
    "u1" : { "s": "timestamp" },
    "u2" : { "s": "timestamp" }
  },
  "following": {
    "u3" : { "s" : "timestamp" },
    "u2" : {
      "s": "timestamp",
      "e": "timestamp"
    }
  }
}
```


This can be stored as a basic
[flat-file database](http://en.wikipedia.org/wiki/Flat_file_database)
where **github-username.json** would be the file

the key here is:

- **u**: *username* (of the person who the user is following
  or being followed by)
- **s**: *startdate* when the person first started following/being followed
- **e**: *enddate* when the person stopped following

In addition to creating a file per user,
we should maintain an index of all the users we are tracking.
the easiest way is to have a new-line-separted list

But... in the interest of being able to run this on Heroku
(where you don't have access to the filesystem so no flat-file-db!)
I'm going to use LevelDB for this.


## Tests

Check:

- [x] GitHub.com is accessible
- [x] a *known* GitHub user exists
- [x] *known* GH user has non-zero number of followers
- [x] *known* GH user is following a non-zero number of people

Scrape following/followers page:

- [ ] Scrape first page
- [ ] Check for 'next' page



# Simple UI

> - [ ] Upload sketch


<br />
---

## FAQ?

**Q**:How is this different from Klout? <br />
**A**:[Klout](https://klout.com/corp/score) tries to calculate your
"influence". That's interesting.


> Must read up about http://en.wikipedia.org/wiki/Inverted_index
> so I understand how to use: https://www.npmjs.org/package/level-inverted-index


## Useful Links

- Summary of ***Most Active*** GitHub users: http://git.io/top
- Intro to web-scraping with cheerio:
https://www.digitalocean.com/community/tutorials/how-to-use-node-js-request-and-cheerio-to-set-up-simple-web-scraping
- GitHub background info: http://en.wikipedia.org/wiki/GitHub

### GitHub Stats API

- Github Stats API: https://developer.github.com/v3/repos/statistics/
- GitHub Followers API: https://developer.github.com/v3/users/followers/

Example:

```sh
curl -v https://api.github.com/users/pgte/followers
```

```js
[
  {
    "login": "methodmissing",
    "id": 379,
    "avatar_url": "https://avatars.githubusercontent.com/u/379?v=2",
    "gravatar_id": "",
    "url": "https://api.github.com/users/methodmissing",
    "html_url": "https://github.com/methodmissing",
    "followers_url": "https://api.github.com/users/methodmissing/followers",
    "following_url": "https://api.github.com/users/methodmissing/following{/other_user}",
    "gists_url": "https://api.github.com/users/methodmissing/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/methodmissing/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/methodmissing/subscriptions",
    "organizations_url": "https://api.github.com/users/methodmissing/orgs",
    "repos_url": "https://api.github.com/users/methodmissing/repos",
    "events_url": "https://api.github.com/users/methodmissing/events{/privacy}",
    "received_events_url": "https://api.github.com/users/methodmissing/received_events",
    "type": "User",
    "site_admin": false
  },

etc...]
```

#### Issues with using the GitHub API:

- The API only returns 30 results per query.
- **X-RateLimit-Limit**: **60** (can only make 60 requests per hour) ...
1440 queries per day (60 per hour x 24 hours) sounds like *ample* on the surface.
But, if we assume the average person has at least 2 pages worth of followers (30<)
it means on a single instance/server we can only track 720 people.
Not really enough to do any sort of trend analysis. :disappointed:
If we are tracking people with hundreds of followers (and *growing fast*)
e.g. 300< followers. the number of users we can track comes down to
1440 / 10 = 140 people...
(10 requests to fetch complete list of followers) we burn through 1440 requests
pretty quickly.
- There's no guarantee which order the followers will be in
(e.g. most recent first?)
- **Results** are ***Cached*** so they are not-real time like they are in the
Web. (seems daft, but its true.) Ideally they would have a ***Streaming API***
but sadly, [GitHub is built in Ruby-on-Rails](http://builtwith.com/github.com)
which is "RESTful" (not real-time).

#### *But*...


Once we know who we *should* be following, we can use

- https://developer.github.com/v3/users/followers/#follow-a-user
- https://developer.github.com/v3/users/followers/#check-if-one-user-follows-another
e.g:

```sh
curl -v https://api.github.com/users/pgte/following/visionmedia
```

## Interesting Facts

- GitHub has 3.4 Million users
- yet the most followed person [Linus Torvalds](https://github.com/torvalds)
only has 19k followers (so its a highly distributed network )

## Data to Scrape

![example github profile](http://i.imgur.com/uDscohR.jpg)

Interesting bits of info have blue squares drawn around them.

Basic Profile Details for TJ:
```js
followerscount: 11000,
  stared: 1000,
  followingcount: 147,
  worksfor: 'Segment.io',
  location: 'Victoria, BC, Canada',
  fullname: 'TJ Holowaychuk',
  email: 'tj@vision-media.ca',
  url: 'http://tjholowaychuk.com',
  joined: '2008-09-18T22:37:28Z',
  avatar: 'https://avatars2.githubusercontent.com/u/25254?v=2&s=460',
  contribs: 3217,
  longest: 43,
  current: 0
```
