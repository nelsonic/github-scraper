# GitHub Scraper

[![Build Status](https://travis-ci.org/nelsonic/github-scraper.png?branch=master)](https://travis-ci.org/nelsonic/github-scraper)
[![Test Coverage](https://codeclimate.com/github/nelsonic/github-scraper/badges/coverage.svg)](https://codeclimate.com/github/nelsonic/github-scraper/coverage)
[![Code Climate](https://codeclimate.com/github/nelsonic/github-scraper.png)](https://codeclimate.com/github/nelsonic/github-scraper)
[![Dependencies](https://david-dm.org/nelsonic/github-scraper.png?theme=shields.io)](https://david-dm.org/nelsonic/github-scraper)
[![devDependency Status](https://david-dm.org/nelsonic/github-scraper/dev-status.svg)](https://david-dm.org/nelsonic/github-scraper#info=devDependencies)
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


### 2. Repositories

The next tab on the personal profile page is "Repositories"
this is a list of the personal projects the person is working on:

[upload screenshot]

We crawl this page and return an array containing the repo properties:

```js

[
  { url: '/iteles/learn-ab-and-multivariate-testing',
    name: 'learn-ab-and-multivariate-testing',
    lang: '',
    desc: 'Tutorial on A/B and multivariate testing',
    info: '',
    stars: '4',
    forks: '0',
    updated: '2015-07-08T08:36:37Z' },
  { url: '/iteles/practical-full-stack-testing',
    name: 'practical-full-stack-testing',
    lang: 'HTML',
    desc: 'A fork of @nelsonic\'s repo to allow for PRs',
    info: 'forked from nelsonic/practical-js-tdd',
    stars: '0',
    forks: '36',
    updated: '2015-06-06T14:40:43Z' },
  { url: '/iteles/styling-for-accessibility',
    name: 'styling-for-accessibility',
    lang: '',
    desc: 'A collection of \'do\'s and \'don\'t\'s of CSS to ensure accessibility',
    info: '',
    stars: '0',
    forks: '0',
    updated: '2015-05-26T11:06:28Z' },
  { url: '/iteles/Ultimate-guide-to-successful-meetups',
    name: 'Ultimate-guide-to-successful-meetups',
    lang: '',
    desc: 'The ultimate guide to organizing successful meetups',
    info: '',
    stars: '3',
    forks: '0',
    updated: '2015-05-19T09:40:39Z' },
  { url: '/iteles/Javascript-the-Good-Parts-notes',
    name: 'Javascript-the-Good-Parts-notes',
    lang: '',
    desc: 'Notes on the seminal "Javascript the Good Parts: byDouglas Crockford',
    info: '',
    stars: '41',
    forks: '12',
    updated: '2015-05-17T16:39:35Z' }
]
```


### 3. Activity feed

Every person on GitHub has an RSS feed for their recent activity

it can be viewed online by visiting:
```sh
https://github.com/{username}?tab=activity
```
e.g: https://github.com/iteles?tab=activity

#### Parsing the Feed

#### Using xml2js to parse the Atom Feed

The activity feed is published as an [**.atom**](https://en.wikipedia.org/wiki/RSS)
xml string which contains a list of entries.

We use [**xml2js**](https://www.npmjs.com/package/xml2js)
(which in turn uses the [**sax**](https://www.npmjs.com/package/sax) xml parser) to parse the xml stream. This results in a object similar to the following example:

```js
{ '$':
   { xmlns: 'http://www.w3.org/2005/Atom',
     'xmlns:media': 'http://search.yahoo.com/mrss/',
     'xml:lang': 'en-US' },
  id: [ 'tag:github.com,2008:/iteles' ],
  link: [ { '$': [Object] }, { '$': [Object] } ],
  title: [ 'iteles’s Activity' ],
  updated: [ '2015-07-22T23:31:25Z' ],
  entry:
   [ { id: [Object],
       published: [Object],
       updated: [Object],
       link: [Object],
       title: [Object],
       author: [Object],
       'media:thumbnail': [Object],
       content: [Object] },
     { id: [Object],
       published: [Object],
       updated: [Object],
       link: [Object],
       title: [Object],
       author: [Object],
       'media:thumbnail': [Object],
       content: [Object] }
    ]
}
```
Each call to the atom feed returns the latest 30 enties.
We're showing 2 here for illustration (_so you get the idea..._)

From this we _extract_ only the relevant info:

```sh
'2015-07-22T12:33:14Z alanshaw pushed to master at alanshaw/david-www',
'2015-07-22T12:33:14Z alanshaw created tag v9.4.3 at alanshaw/david-www',
'2015-07-22T09:23:28Z alanshaw closed issue tableflip/i18n-browserify#6',
'2015-07-21T17:08:19Z alanshaw commented on issue alanshaw/david#71',
'2015-07-21T08:24:13Z alanshaw pushed to master at tableflip/score-board',
'2015-07-20T17:49:59Z alanshaw deleted branch refactor-corp-events at tableflip/sow-api-client',
'2015-07-20T17:49:58Z alanshaw pushed to master at tableflip/sow-api-client',
'2015-07-20T17:49:58Z alanshaw merged pull request tableflip/sow-api-client#2',
'2015-07-20T17:49:54Z alanshaw opened pull request tableflip/sow-api-client#2',
'2015-07-18T07:30:36Z alanshaw closed issue alanshaw/md-tokenizer#1',
'2015-07-18T07:30:36Z alanshaw commented on issue alanshaw/md-tokenizer#1',
```
As we can see from this there are several event types:

+ **pushed to master** at
+ **created tag** v9.4.3 at
+ **opened issue**
+ **commented on issue**
+ **closed issue**
+ **deleted branch**
+ **opened pull request**
+ **merged pull request**
+ **starred** username/repo-name

For now we are *not* going to parse the event types, we are simply going to store them in our list for later analysis.

We have a good pointer when its time to start interpreting the data:
https://developer.github.com/v3/activity/events/types/

One thing worth noting is that RSS feed is ***Not Real-Time*** ...
sadly, it only gets updated periodically so we cannot rely on it to
have the *latest* info.


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
+ GitHub Event Types:
https://developer.github.com/v3/activity/events/types/

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
+ https://www.githubarchive.org/ attempts to archive all of GitHub
+ http://octoboard.com/ shows stats for the past 24h


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
