# GitHub Scraper

[![Build Status](https://travis-ci.org/nelsonic/fuata.png?branch=master)](https://travis-ci.org/nelsonic/fuata)
[![Test Coverage](https://codeclimate.com/github/nelsonic/fuata/badges/coverage.svg)](https://codeclimate.com/github/nelsonic/fuata/coverage)
[![Code Climate](https://codeclimate.com/github/nelsonic/fuata.png)](https://codeclimate.com/github/nelsonic/fuata)
[![Dependencies](https://david-dm.org/nelsonic/fuata.png?theme=shields.io)](https://david-dm.org/nelsonic/fuata)
[![devDependency Status](https://david-dm.org/nelsonic/fuata/dev-status.svg)](https://david-dm.org/nelsonic/fuata#info=devDependencies)
<!-- [![NPM version](https://badge.fury.io/js/fuata.png)](https://npmjs.org/package/fuata) -->

## Why?

_How_ can we _discover_ which are the _interesting_ people and projects
on GitHub (without *manually* checking *dozens* of GitHub profiles/repositories each day) ?

We _could_ use the [GitHub ***API***](https://developer.github.com/v3/)
to get (_almost_ all the) records from GitHub, but sadly,
it has quite a few limitations (see: "_Issues with GitHub API_" section below) the biggest limitation being the _rate-limiting_ on API requests.

We need a _simple_ way of systematically getting ***all*** the info from GitHub so that we can store trends.

We are building this project to [***scratch our own itch***](https://gettingreal.37signals.com/ch02_Whats_Your_Problem.php)
if you too want to know


## What *Problem* (are we trying to solve)?

+ ***Who*** are the up-and-comming people (_worth following_) on GitHub?
+ ***Which*** are the ***interesting projects*** (*and why?!*)
+ Is a project's ***popularity growing*** or decreasing?
+ What are the chances of success for a given project?


## How?

We are "[_crawling_](https://en.wikipedia.org/wiki/Web_crawler)" GitHub
to extract raw data which we will derive insights / trends and present a tailored dashboard for each person using the site.

### 1. Profile

Everything starts with the personal profile.

![example github profile](http://i.imgur.com/uDscohR.jpg)

Interesting bits of info have blue squares drawn around them.

Basic Profile Details for TJ:
```js
  followercount: 11000,
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



### Data Model

We expect to store a couple of hundred (million) records in the database.

- fullName
- @username
- dateJoined

Following
- following @username
- dateFollowed
- dateUnfollowed

same for followers.


Example data structure:
(nested Objects are easier for data updates)
```js
{
  "followers": {
    "u1" : ["timestamp"],
    "u2" : ["timestamp"]
  },
  "following": {
    "u3" : ["timestamp"],
    "u2" : ["timestamp", "timestamp2", "timestamp3"]
  }
}
```


This can be stored as a basic
[flat-file database](http://en.wikipedia.org/wiki/Flat_file_database)
where **github-username.json** would be the file

the key here is:

- **u**: *username* (of the person who the user is following
  or being followed by)
- **timestamp**: *startdate* when the person first started following/being followed
*enddate* when the person stopped following

In addition to creating a file per user,
we should maintain an index of all the users we are tracking.
the easiest way is to have a new-line-separted list.

~~But... in the interest of being able to run this on Heroku
(where you don't have access to the filesystem so no flat-file-db!)
I'm going to use LevelDB for this.~~ >> Use Files on DigitalOcean!


## Tests

Check:

- [x] GitHub.com is accessible
- [x] a *known* GitHub user exists
- [x] *known* GH user has non-zero number of followers
- [x] *known* GH user is following a non-zero number of people

Scrape following/followers page:

- [x] Scrape first page
- [x] Check for 'next' page

New user?
- [x] If a user doesn't exist in the Database create it.
- [x] set time for **lastupdated** to *now*.

Read data from db/disk so we can update it.
- [x] If a user has previously been crawled there will be a record in db

## Backup the Data

Given that LevelDB is Node (in-memory) storage.
It makes sense to either pay for persistance or ***use files***!

### Quantify Data Load

Each time we crawl a user's profile we add 5kb (average) data to the file.

![340kb 73 files](http://i.imgur.com/8VRPCmC.png)

so crawling the full list of GitHub users (5 Million) *once*
would require 5,000,000 * 5kb = 25 Gb!



We might need to find a more efficient way of storing the data.
SQL?

# Simple UI

- [ ] Upload sketch


<br />
---

## FAQ?

**Q**: How is this different from Klout? <br />
**A**: [Klout](https://klout.com/corp/score) tries to calculate your
social "influence". That's *interesting* but useless for tracking *makers*.



## Research

> Must read up about http://en.wikipedia.org/wiki/Inverted_index
> so I understand how to use: https://www.npmjs.org/package/level-inverted-index

- GitHub stats (node module): https://github.com/apiengine/ghstats
(no tests or recent work/activity, but interesting functionality)

- Hard Drive reliability stats:
https://www.backblaze.com/blog/hard-drive-reliability-update-september-2014
(useful when selecting which drives to use in the storage array -
  Clear Winner is Hitachi 3TB)
- RAID explained in layman's terms:
http://uk.pcmag.com/storage-devices-reviews/7917/feature/raid-levels-explained
- RAID Calculator:
https://www.synology.com/en-global/support/RAID_calculator
(if you don't already know how much space you get)
- SQLite limits: https://www.sqlite.org/limits.html

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

#### Issues (with using the) GitHub API:

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



## Tasks

* [x] Add lastmodified checker for DB (avoid crawling more than once a day) >> db.lastUpdated
* [x] Save List of Users to DB
* [ ] Check Max Crawler Concurrency
* [ ] Experiment with Child Processes?
* [ ] Record Profile (basics) History

Crawler Example:

```js
var C = require('./src/index.js');

var user = 'alanshaw';

C.crawlUser(user, function (err, profile) {
  console.log(profile);
});
```

# Objective 1

- Track who the best people to follow are
- Track if I am already following a person


### Twitter Followers

- https://dev.twitter.com/rest/reference/get/followers/list
- https://github.com/twitter/twurl
