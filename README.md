# GitHub Scraper

[![Build Status](https://travis-ci.org/nelsonic/github-scraper.png?branch=master)](https://travis-ci.org/nelsonic/github-scraper)
[![Test Coverage](https://codeclimate.com/github/nelsonic/github-scraper/badges/coverage.svg)](https://codeclimate.com/github/nelsonic/github-scraper/coverage)
[![Code Climate](https://codeclimate.com/github/nelsonic/github-scraper.png)](https://codeclimate.com/github/nelsonic/github-scraper)
[![Dependencies](https://david-dm.org/nelsonic/github-scraper.png?theme=shields.io)](https://david-dm.org/nelsonic/github-scraper)
[![devDependency Status](https://david-dm.org/nelsonic/github-scraper/dev-status.svg)](https://david-dm.org/nelsonic/github-scraper#info=devDependencies)
<!-- [![NPM version](https://badge.fury.io/js/fuata.png)](https://npmjs.org/package/fuata) -->

## Why?

Our _initial reason_ for writing this set of scrapers was to satisfy the _curiosity_ / _question_:
> _How_ can we ***discover*** which are the ***interesting people and projects
on GitHub***  
(_without **manually** checking *dozens* of GitHub profiles/repositories each day_) ?

Our _second reason_ for scraping data from GitHub is so that we can show people a "*summary view*" of all their issues in our [Tudo](https://github.com/dwyl/tudo) project (which helps people track/manage/organise/prioritise their GitHub issues).
See: https://github.com/dwyl/tudo/issues/51

We needed a _simple_ way of systematically getting data from GitHub (_before people authenticate_) and scraping is the only way we could think of.

We _tried_ using the [GitHub ***API***](https://developer.github.com/v3/)
to get records from GitHub, but sadly,
it has quite a few limitations (see: "_Issues with GitHub API_" section below) the biggest limitation being the [_rate-limiting_](https://developer.github.com/v3/#rate-limiting) on API requests.

Thirdly we're building this project to [***scratch our own itch***](https://gettingreal.37signals.com/ch02_Whats_Your_Problem.php)  
... scraping the _pages_ of GitHub has given us a _unique_ insight into the features of the platform which has leveled-up our skills.

> Don't *you* want to know ***what's "Hot" right now on GitHub***...?


## What (*Problem* are we _trying_ to Solve)?

Having a way of extracting the *essential* data from GitHub
is a solution to a _surprisingly **wide array of problems**_, here are a few:

+ ***Who*** are the up-and-comming people (_worth following_) on GitHub?
+ ***Which*** are the ***interesting projects*** (*and why?!*)
+ ***What*** is the average age of an issue for a project?
+ Is a project's ***popularity growing*** or *plateaued*?
+ Are there (_already_) any ***similar projects*** to what I'm trying to build? (_reduce duplication of effort which is rampant in Open Source!!_)
+ How many projects get started but never finished?
+ ***Will*** my **Pull Request** *ever* get *merged* or is the module maintainer *too busy* and did I just [***waste 3 hours***](https://twitter.com/nelsonic/status/621984170353524736)?
+ _insert **your idea/problem** here_ ...

# How?

This module fetches (_public_) pages on GitHub and "[_scrapes_](https://en.wikipedia.org/wiki/Web_scraping)" the html to extract raw data.

## People

### 1. Profile

Everything starts with the personal profile.

![example github profile](http://i.imgur.com/uDscohR.jpg)

Interesting bits of info have blue squares drawn around them.

Basic Profile Details for TJ (_with organisations_):
```js
{ followercount: 15000,
  stared: 1000,
  followingcount: 164,
  worksfor: 'Segment.com',
  location: 'Victoria, BC, Canada',
  fullname: 'TJ Holowaychuk',
  email: 'tj@vision-media.ca',
  url: 'http://tjholowaychuk.com',
  joined: '2008-09-18T22:37:28Z',
  avatar: 'https://avatars2.githubusercontent.com/u/25254?v=3&s=460',
  contribs: 705,
  longest: 8,
  current: 0,
  lastupdated: 1437741697916,
  orgs:
   [ '/zeromq https://avatars0.githubusercontent.com/u/109777?v=3&s=84',
     '/LearnBoost https://avatars0.githubusercontent.com/u/204174?v=3&s=84',
     '/senchalabs https://avatars1.githubusercontent.com/u/313839?v=3&s=84',
     '/segmentio https://avatars0.githubusercontent.com/u/819518?v=3&s=84',
     '/luna https://avatars0.githubusercontent.com/u/1493601?v=3&s=84',
     '/component https://avatars2.githubusercontent.com/u/1687071?v=3&s=84',
     '/basijeGithub https://avatars3.githubusercontent.com/u/4106647?v=3&s=84',
     '/solid https://avatars2.githubusercontent.com/u/4202963?v=3&s=84',
     '/koajs https://avatars1.githubusercontent.com/u/5055057?v=3&s=84',
     '/slate https://avatars3.githubusercontent.com/u/5479637?v=3&s=84',
     '/clibs https://avatars3.githubusercontent.com/u/5657447?v=3&s=84',
     '/reworkcss https://avatars2.githubusercontent.com/u/5658224?v=3&s=84',
     '/expressjs https://avatars3.githubusercontent.com/u/5658226?v=3&s=84',
     '/cojs https://avatars3.githubusercontent.com/u/6047096?v=3&s=84',
     '/uv https://avatars1.githubusercontent.com/u/6080123?v=3&s=84',
     '/nanodb https://avatars0.githubusercontent.com/u/6482465?v=3&s=84',
     '/jstrace https://avatars3.githubusercontent.com/u/6807372?v=3&s=84' ] }
```

### 3. Activity feed

Every person on GitHub has an RSS feed for their recent activity;
this is the 3rd and final tab of the person's profile page.

it can be viewed online by visiting:
```sh
https://github.com/{username}?tab=activity
```
e.g: https://github.com/iteles?tab=activity

#### Parsing the Feed

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
Instead of _wasting_ (_what will be **Giga**_) ***Bytes*** of space with key:value pairs by storing the entries as JSON, we are storing the activity feed entries as strings in an array.
Each item in the array can be broken down into:
```sh
{date-time} {username} {action} {link}
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


### 3. Followers

Who is following this person

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

- **u**: *username* (the GitHub username of the person)
- **timestamp**: *startdate* when the person first starred/watched (a repo) or followed a person
> note: when multiple timestamps are recorded this signifies that the person starred and then un-starred (or un-watched) the repo or followed then un-followed a person.

### 4. starred

Which repositories has the person starred?



<br />

## Projects

### 2. Repositories

The next tab on the personal profile page is "Repositories"
this is a **list** of the ***personal projects*** the person is working on, e.g: https://github.com/iteles?tab=repositories

<img width="1033" alt="github-ines-list-of-repositories" src="https://cloud.githubusercontent.com/assets/194400/8909661/7e83e97e-347a-11e5-84c9-239f558a2b98.png">

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
  { url: '/iteles/learn-tdd',
    name: 'learn-tdd',
    lang: 'JavaScript',
    desc: 'A brief introduction to Test Driven Development (TDD) in JavaScript',
    info: 'forked from dwyl/learn-tdd',
    stars: '0',
    forks: '4',
    updated: '2015-06-29T17:24:56Z' },
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

### 4. Repository Stats

This is where things start getting interesting ...

![github-repo-page](https://cloud.githubusercontent.com/assets/194400/8930109/d8a76ab8-3522-11e5-8e07-95596a889fde.png)

example: https://github.com/nelsonic/adoro

```js
{
  url: 'https://github.com/nelsonic/adoro',
  desc: 'The little publishing tool you\'ll love using. [work-in-progress]',
  website: 'http://www.dwyl.io/',
  watchers: 3,
  stars: 8,
  forks: 1,
  commits: 12,
  branches: 1,
  releases: 1,
  langs: [ 'JavaScript 90.7%', 'CSS 9.3%' ]
}
```

> Annoyingly the number of issues and pull requests, contributors and issues
 are only rendered *after* the page has loaded (via XHR) so we do not get
 these three stats on page load.

### 5. Issues

Clicking on the issues icon/link in any repository takes us to the list of all the issues.

Visiting a project with more than a page worth of issues has pagination at the bottom of the page:

![tudo-issues-list-showing-pagination](https://cloud.githubusercontent.com/assets/194400/8942419/27b9446a-356d-11e5-84f9-5de2eaae506b.png)

Which has a link to: https://github.com/dwyl/tudo/issues?page=2&q=is%3Aissue+is%3Aopen

![tudo-issues-second-page](https://cloud.githubusercontent.com/assets/194400/8942423/33bf0a2e-356d-11e5-82b8-1bd142fb2302.png)



List of issues for a repository:

```sh
{ entries:
   [
     {
       url: '/dwyl/tudo/issues/46',
       title: 'discuss components',
       created: '2015-07-21T15:34:22Z',
       author: 'benjaminlees',
       comments: 3,
       assignee: 'izaakrogan',
       milestone: 'I don\'t know what I\'m doing',
       labels: [ 'enhancement', 'help wanted', 'question' ]
     },
     {
       url: '/dwyl/tudo/issues/45',
       title: 'Create riot components from HTML structure files',
       created: '2015-07-21T15:24:58Z',
       author: 'msmichellegar',
       comments: 2,
       assignee: 'msmichellegar',
       labels: [ 'question' ]
     }
  ],
  open: 30,
  closed: 20,
  next: '/dwyl/tudo/issues?page=2&q=is%3Aissue+is%3Aopen'
}
```

Each issue in the list would create a entry in the crawler (worker) queue:
```sh
2015-07-22T12:33:14Z issue /dwyl/tudo/issues/77
```

> Should we include the "all issues by this author" link?
+ **created_by** https://github.com/dwyl/tudo/issues/created_by/iteles
+ **assignee** (assigned to): https://github.com/dwyl/tudo/issues?q=assignee%3Aiteles+is%3Aopen

### Milestones

Milestones are used to group issues into logical units.

![dwyl-tudo-milestones](https://cloud.githubusercontent.com/assets/194400/9010055/b3e4da72-379c-11e5-8fd3-680bf928a389.png)

```js
{
  entries:
   [ { name: 'Test Milestone - Please Don\'t Close!',
       due: 'Past due by 12 days',
       updated: 'Last updated about 4 hours ago',
       desc: 'This Milestone in used in our e2e tests to check for an over-due milestone, so please don\'t close it!',
       progress: '0%',
       open: 1,
       closed: 0 } ],
  open: 2,
  closed: 1
}
```


### 5.b Issues > Search

A ***much*** more *effective* way of collating all the issues relevant to a person is to search for them!

example:
 https://github.com/search?type=Issues&q=author%3Aiteles&state=open&o=desc&s=created

```js
{
  entries:
   [
     { title: 'Remove flexbox from CSS',
       url: '/dwyl/dwyl.github.io/issues/29',
       desc: 'To ensure the site works across all devices, particularly Kindle/e-readers.',
       author: 'iteles',
       created: '2015-07-25T22:57:20Z',
       comments: 2 },
     { title: 'CSS | Add indentation back into main.css (disappeared from master)',
       url: '/dwyl/tudo/issues/77',
       desc: 'All indentation has been removed from main.css in the latest commit.     \n\nThis needs to be put back in as originally written by @msmichellegar and @iteles.',
       author: 'iteles',
       created: '2015-07-25T16:27:59Z' },
     { title: 'CSS | Investigate styling of issue label colours',
       url: '/dwyl/tudo/issues/72',
       desc: 'Labels can be given any colour so there is no predictable set that we can code into the CSS file.\n\nWe need to investigate what the best way to ensure we can provide the right colour of background to the ...',
       author: 'iteles',
       created: '2015-07-23T17:49:02Z',
       comments: 4 }
  ],
  next: '/search?o=desc&p=2&q=author%3Aiteles&s=created&state=open&type=Issues'
}
```


#### Owner

For the issues created across all their *personal* repositories
use a search query of the form:
```sh
https://github.com/search?q=user%3A{username|org}
&state={state}
&type=Issues&s={relevance}
&o={order}
```
e.g:
https://github.com/search?q=user%3Aiteles&state=open&type=Issues&s=updated&o=asc

#### Author (_created by_)

Or to find ***all*** the issues where the person is the ***author***
use a query of the following format:

```sh
https://github.com/search?q=author%3A{username|org}
&state={state}
&type=Issues&s={relevance}
&o={order}
```

#### Assignee (_issues assigned to this person_)

Or to find ***all*** the issues *assigned* to the person use a query of the following format:

```sh
https://github.com/search?q=assignee%3A{username|org}
&state={state}
&type=Issues&s={relevance}
&o={order}
&s={filter}
```

#### Mentions

We can use a ***mentions*** (search) query to discover all the
issues where a given person (_username_) was mentioned:

```sh
https://github.com/search?q=mentions%3A{username}&type=Issues&state={state}
```

e.g: https://github.com/search?q=mentions%3Aiteles&type=Issues&state=open

This _could_ be more than the issues in the person's (_own_) repos *or* the repos the person has access to (_via org_). e.g:
if [_Sally_](http://www.imdb.com/title/tt1483013/quotes?item=qt1905812)
  axks a clarifying question on a project she has not yet contributed to,
  the issue will not appear when we crawl the repos on her profile or orgs she has access to ...

#### Issues Filters

There are *many* filters we can use to find issues, here are a few:

+ **created** https://github.com/search?q=author%3Aiteles&s=created&type=Issues&o=desc&state=open
+ **updated**: https://github.com/search?q=author%3Aiteles&s=updated&type=Issues&o=desc&state=open
+ **date range**: https://github.com/dwyl/time/issues?q=is%3Aissue+is%3Aopen+updated%3A%3C2015-06-28

##### Further Reading on Searching+Filters

For *way* more details on searching & filters see:

+ https://help.github.com/articles/searching-issues/
+ https://help.github.com/articles/searching-github/#types-of-searches
+ https://help.github.com/articles/search-syntax/


### 6. Issue (_individual_)


### 7. Labels (for a repository)

All repositories have a set of standard labels (built-in to GitHub)
e.g: https://github.com/dwyl/tudo/labels is (_currently_) only using the "*standard*" labels.

<img width="998" alt="github-dwyl-tudo-labels-list" src="https://cloud.githubusercontent.com/assets/194400/8945752/36c87754-3582-11e5-9a46-a4a786ca7c25.png">

Whereas the RethinkDB (which uses GitHub for all their project tracking) uses _several **custom labels**_:
https://github.com/rethinkdb/rethinkdb/labels

<img width="996" alt="github-rethinkdb-issues-list" src="https://cloud.githubusercontent.com/assets/194400/8945786/7b98b718-3582-11e5-961b-905d268dd39a.png">

We need to crawl these for each repo.

Here's the extraction of the standard labels:
```js
[
  { name: 'bug',
    style: 'background-color: #fc2929; color: #fff;',
    link: '/dwyl/tudo/labels/bug',
    count: 3 },
  { name: 'duplicate',
    style: 'background-color: #cccccc; color: #333333;',
    link: '/dwyl/tudo/labels/duplicate',
    count: 0 },
  { name: 'enhancement',
    style: 'background-color: #84b6eb; color: #1c2733;',
    link: '/dwyl/tudo/labels/enhancement',
    count: 11 },
  { name: 'help wanted',
    style: 'background-color: #159818; color: #fff;',
    link: '/dwyl/tudo/labels/help%20wanted',
    count: 21 },
  { name: 'invalid',
    style: 'background-color: #e6e6e6; color: #333333;',
    link: '/dwyl/tudo/labels/invalid',
    count: 1 },
  { name: 'question',
    style: 'background-color: #cc317c; color: #fff;',
    link: '/dwyl/tudo/labels/question',
    count: 10 }
]
```

## Future Features / Road Map ?


### Crawl the List of commits

Would it be interesting to see/track:
+ **who** makes the most commits to the project
+ **when** (***what time*** of day/night) people do their work
+ **what** did the person contribute? (docs, code improvement, tests, typo, dependency update?)

Show your interest in this feature: https://github.com/nelsonic/github-scraper/issues/17


## Tests

Check:

- [x] GitHub.com is accessible (this is implied by any of the methods returning a result; if no results, then the site is unavailable)
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

- GitHub has 10.3 Million users (_at last count_)
- yet the most followed person [Linus Torvalds](https://github.com/torvalds)
"_only_" has **28k followers** (_so its a **highly distributed network**_ )
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
