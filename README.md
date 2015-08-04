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

This module fetches (_public_) pages from GitHub,  "[_scrapes_](https://en.wikipedia.org/wiki/Web_scraping)" the html to extract raw data and returns a JSON Object.

# Usage

## install from NPM

instal from npm and save to your `package.json`:

```sh
npm install github-scraper --save
```

## Use it in your script!

```js
var gs = require('github-scraper');
var url = '/iteles' // a random username
switcher(url, function(err, data) {
  console.log(data); // or what ever you want to do with the data
})
```

### Sample Output for Profile Page

Using the scraper in the way described above (to scrape a user profile)
will yield the following results

```js
{
  url: 'https://github.com/iteles'
  website: 'http://www.twitter.com/iteles',
  followercount: 45,
  starred: 88,
  followingcount: 32,
  worksfor: 'dwyl.io',
  location: 'London, UK',
  fullname: 'Ines Teles',
  email: '',
  joined: '2013-04-17T21:10:06Z',
  avatar: 'https://avatars1.githubusercontent.com/u/4185328?v=3&s=460',
  contribs: 824,
  longest: 156,
  current: 156,
  lastupdated: 1438751565678,
  orgs:
   [ '/ladieswhocode https://avatars1.githubusercontent.com/u/1634620?v=3&s=84',
     '/bowlingjs https://avatars3.githubusercontent.com/u/8825909?v=3&s=84',
     '/foundersandcoders https://avatars3.githubusercontent.com/u/9970257?v=3&s=84',
     '/docdis https://avatars0.githubusercontent.com/u/10836426?v=3&s=84',
     '/dwyl https://avatars2.githubusercontent.com/u/11708465?v=3&s=84' ]
}
```

## Example URLs and Output

### Profile Page

User profile has the following format `https://github.com/{username}`  
example: [https://github.com/**alanshaw**](https://github.com/alanshaw)

```js
var gs = require('github-scraper'); // require the module
var url = 'alanshaw' // a random username (of someone you should follow!)
gs(url, function(err, data) {
  console.log(data); // or what ever you want to do with the data
})
```

Sample output:

```js
{
  entries: [],
  url: 'https://github.com/alanshaw',
  followercount: 161,
  starred: 243,
  followingcount: 19,
  worksfor: 'TABLEFLIP',
  location: 'London',
  fullname: 'Alan Shaw',
  email: '',
  website: 'http://tableflip.io/',
  joined: '2009-11-13T14:39:19Z',
  avatar: 'https://avatars3.githubusercontent.com/u/152863?v=3&s=460',
  contribs: 1030,
  longest: 11,
  current: 2,
  lastupdated: 1438723919828,
  orgs:
   [ '/lnug https://avatars2.githubusercontent.com/u/4046959?v=3&s=84',
     '/polestarglobal https://avatars0.githubusercontent.com/u/4190361?v=3&s=84',
     '/nodesecurity https://avatars3.githubusercontent.com/u/4229593?v=3&s=84',
     '/require-lx https://avatars3.githubusercontent.com/u/4672751?v=3&s=84',
     '/tableflip https://avatars3.githubusercontent.com/u/5347145?v=3&s=84',
     '/LXJS https://avatars2.githubusercontent.com/u/6461627?v=3&s=84',
     '/nexttick https://avatars1.githubusercontent.com/u/6919683?v=3&s=84',
     '/yldio https://avatars3.githubusercontent.com/u/6999859?v=3&s=84',
     '/driift https://avatars1.githubusercontent.com/u/7840567?v=3&s=84',
     '/meteor-london https://avatars3.githubusercontent.com/u/7863151?v=3&s=84',
     '/dimsumjs https://avatars0.githubusercontent.com/u/8371806?v=3&s=84',
     '/docdis https://avatars0.githubusercontent.com/u/10836426?v=3&s=84',
     '/librariesio https://avatars2.githubusercontent.com/u/11243589?v=3&s=84',
     '/dwyl https://avatars2.githubusercontent.com/u/11708465?v=3&s=84',
     '/kittorrent https://avatars0.githubusercontent.com/u/13317556?v=3&s=84' ],
  developerprogram: true
}
```
### Followers

How many people are following a given person on Github.
Url format: `https://github.com/{username}/followers`  
example: [https://github.com/iteles/**followers**](https://github.com/iteles/followers)

```js
var gs = require('github-scraper'); // require the module
var url = 'iteles/followers' // a random username (of someone you should follow!)
gs(url, function(err, data) {
  console.log(data); // or what ever you want to do with the data
})
```

Sample output:

```js
{ entries:
   [ 'tunnckoCore', 'OguzhanE', 'minaorangina', 'Jasonspd', 'muntasirsyed', 'fmoliveira', 'nofootnotes',
    'SimonLab', 'Danwhy', 'kbocz', 'cusspvz', 'RabeaGleissner', 'beejhuff', 'heron2014', 'joshpitzalis',
    'rub1e', 'nikhilaravi', 'msmichellegar', 'anthonybrown', 'miglen', 'shterev', 'NataliaLKB',
    'ricardofbarros', 'boymanjor', 'asimjaved', 'amilvasishtha', 'Subhan786', 'Neats29', 'lottie-em',
    'rorysedgwick', 'izaakrogan', 'oluoluoxenfree', 'markwilliamfirth', 'bmordan', 'nodeco', 'besarthoxhaj',
    'FilWisher', 'maryams', 'sofer', 'joaquimserafim', 'vs4vijay', 'intool', 'edwardcodes', 'hyprstack',
    'nelsonic' ],
  url: 'https://github.com/iteles/followers' }
ok 1 iteles/followers count: 45
```

If the person has ***more than 51 followers*** they will have multiple pages of followers.
The data will have a **next_page** key with a value such as:
[/nelsonic/followers?**page=2**](https://github.com/nelsonic/followers?page=2)
If you want to keep fetching these subsequent pages of followers,
simply keep running the scraper:
e.g:

```js
var url = 'alanshaw/followers' // a random username (of someone you should follow!)
gs(url, function(err, data) {
  console.log(data); // or what ever you want to do with the data
  if(data.next_page) {
    gs(data.next_page, function(err2, data2)) {
      console.log(data2); // etc.
    }
  }
})
```

### **Following**
Want to know the list of people this person is `following` that's *easy* too!
The url format is: `https://github.com/{username}/following`
e.g: [https://github.com/iteles/**following**](https://github.com/iteles/following) or
[https://github.com/nelsonic/following?**page=2**](https://github.com/nelsonic/following?page=2)
(_where the person is following more than 51 people_ ...)

Usage format is *identical* to `followers` (above) so here's an example
of fetching page 3 of the results:

```js
var gs = require('github-scraper'); // require the module
var url = 'nelsonic/following?page=3' // a random dude
gs(url, function(err, data) {
  console.log(data); // or what ever you want to do with the data
})
```

```js
{
  entries:
   [ 'kytwb', 'dexda', 'arrival', 'jinnjuice', 'slattery', 'unixarcade', 'a-c-m', 'krosti',
   'simonmcmanus', 'jupiter', 'capaj', 'cowenld', 'FilWisher', 'tsop14', 'NataliaLKB',
   'izaakrogan', 'lynnaloo', 'nvcexploder', 'cwaring', 'missinglink', 'alanshaw', 'olizilla',
   'tancredi', 'Ericat', 'pgte' 'hyprstack', 'iteles' ],
  url: 'https://github.com/nelsonic/following?page=3',
  next_page: 'https://github.com/nelsonic/following?page=4'
}
```



### Starred repos



### Repositories




### Activity feed

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


### Organization

Organization pages have the following url pattern: `https://github.com/{orgname}`  
example: [https://github.com/**dwyl**](https://github.com/dwyl)
(`entries` _truncated for brevity_)
```js
{
  entries:
   [ { name: 'hapi-auth-jwt2',
       desc: 'Secure Hapi.js authentication plugin using JSON Web Tokens (JWT)',
       updated: '2015-08-04T19:30:50Z',
       lang: 'JavaScript',
       stars: '59',
       forks: '11' },
     { name: 'start-here',
       desc: 'A Quick-start Guide for People who want to DWYL',
       updated: '2015-08-03T11:04:14Z',
       lang: 'HTML',
       stars: '14',
       forks: '9' },
     { name: 'summer-2015',
       desc: 'Probably the best Summer Sun, Fun & Coding Experience in the World!',
       updated: '2015-07-31T11:02:29Z',
       lang: 'CSS',
       stars: '16',
       forks: '1' },
  ],
  url: 'http://dwyl.io',
  name: 'dwyl - do what you love',
  desc: 'Start here: https://github.com/dwyl/start-here',
  location: 'Your Pocket',
  email: 'github@dwyl.io',
  pcount: 24,
  avatar: 'https://avatars3.githubusercontent.com/u/11708465?v=3&s=200',
  next_page: '/dwyl?page=2'
}
```
Note #1: *sadly*, this has the ***identical*** url format to *Profile*
this gets handled by the `switcher` which infers what is an org vs. profile page
by checking for an known element on the page.

Note #2: when an organization has *multiple pages* of repositories you will see a `next_page`
key/value in the `data` e.g: [/dwyl?**page=2**](/dwyl?page=2) (for the second page of repos)




## Want More Examples?

If you want ***even more*** examples of the pages you can scrape,
take a look at our end-to-end tests where we *test* all the scrapers!


<br />

## tl;dr

If you are the kind of person that likes to *understand* how something works,
this is *your* section.

### Inferring Which Scraper to use from the URL

`lib/switcher.js` handles inference.
We wanted to use a `switch > case` construct but, ended up using `if/else`
because there are two types of checks we need to do so `if/else` seemed simpler.




## Interesting Facts

- GitHub has 10.3 Million users (_at last count_)
- yet the most followed person [Linus Torvalds](https://github.com/torvalds)
"_only_" has **28k followers** (_so its a **highly distributed network**_ )
+ https://www.githubarchive.org/ attempts to archive all of GitHub
+ http://octoboard.com/ shows stats for the past 24h
