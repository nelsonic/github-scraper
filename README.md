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
+ **Associative Lists** e.g: People who starred `abc` also liked `xyz`


# How?

This module fetches (_public_) pages from GitHub, "[_scrapes_](https://en.wikipedia.org/wiki/Web_scraping)" the html to extract raw data and returns a JSON Object.

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

Sample output:

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

### Starred Repositories

The list of projects a person has *starred* a fascinating source of insight.
url format: https://github.com/stars/{username}
e.g: [/stars/iteles](https://github.com/stars/iteles)

```js
var gs = require('github-scraper'); // require the module
var url = 'stars/iteles';           // starred repos for this user
gs(url, function(err, data) {
  console.log(data);                // or what ever you want to do with the data
})
```

Sample output:

```js
{
  entries:
   [ '/dwyl/repo-badges', '/nelsonic/learn-testling', '/joshpitzalis/testing', '/gmarena/gmarena.github.io',
    '/dwyl/alc', '/nikhilaravi/fac5-frontend', '/foundersandcoders/dossier', '/nelsonic/health', '/dwyl/alvo',
    '/marmelab/gremlins.js', '/docdis/learn-saucelabs', '/rogerdudler/git-guide', '/tableflip/guvnor',
    '/dwyl/learn-redis', '/foundersandcoders/playbook', '/MIJOTHY/FOR_FLUX_SAKE', '/NataliaLKB/learn-git-basics',
    '/nelsonic/liso', '/dwyl/learn-json-web-tokens', '/dwyl/hapi-auth-jwt2', '/dwyl/start-here',
    '/arvida/emoji-cheat-sheet.com', '/dwyl/time', '/docdis/learn-react', '/dwyl/esta', '/alanshaw/meteor-foam',
    '/alanshaw/stylist', '/meteor-velocity/velocity', '/0nn0/terminal-mac-cheatsheet',
    '/bowlingjs/bowlingjs.github.io' ],
  url: 'https://github.com/stars/iteles?direction=desc&page=2&sort=created',
  next_page: 'https://github.com/stars/iteles?direction=desc&page=3&sort=created'
}
```

### Repositories

The second tab on the personal profile page is "Repositories"
this is a **list** of the ***personal projects*** the person is working on, e.g: https://github.com/iteles?tab=repositories

<img width="1033" alt="github-ines-list-of-repositories" src="https://cloud.githubusercontent.com/assets/194400/8909661/7e83e97e-347a-11e5-84c9-239f558a2b98.png">

We crawl this page and return an array containing the repo properties:

```js
var url = 'iteles?tab=repositories';
gs(url, function(err, data) {
  console.log(data);  // or what ever you want to do with the data
})
```

sample output:

```js
{
  entries: [
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
  ],
  url: 'https://github.com/iteles?tab=repositories' }
```


### Activity feed

Every person on GitHub has an RSS feed for their recent activity;
this is the 3rd and final tab of the person's profile page.

it can be viewed online by visiting:
```sh
https://github.com/{username}?tab=activity
```
e.g: [/iteles?tab=activity](https://github.com/iteles?tab=activity)


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

```js
var url = 'dwyl';
gs(url, function(err, data) {
  console.log(data); // or do something way more interesting with the data!
});
```

sample data (`entries` _truncated for brevity_):
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
  website: 'http://dwyl.io',
  url: 'https://github.com/dwyl',
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


### Repository Stats

This is where things start getting interesting ...

![github-repo-page](https://cloud.githubusercontent.com/assets/194400/8930109/d8a76ab8-3522-11e5-8e07-95596a889fde.png)

example: https://github.com/nelsonic/adoro

```js
var url = 'nelsonic/adoro';
gs(url, function(err, data) {
  console.log(data); // or do something way more interesting with the data!
});
```

sample data:

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


 ### 7. Issues

 Clicking on the issues icon/link in any repository takes us to the list of all the issues.

 Visiting a project with more than a page worth of issues has pagination at the bottom of the page:

 ![tudo-issues-list-showing-pagination](https://cloud.githubusercontent.com/assets/194400/8942419/27b9446a-356d-11e5-84f9-5de2eaae506b.png)

 Which has a link to: https://github.com/dwyl/tudo/issues?page=2&q=is%3Aissue+is%3Aopen

 ![tudo-issues-second-page](https://cloud.githubusercontent.com/assets/194400/8942423/33bf0a2e-356d-11e5-82b8-1bd142fb2302.png)

 List of issues for a repository:

 ```js
 var gs  = require('github-scraper');
 var url = '/dwyl/tudo/issues';
 gs(url, function (err, data) {
   console.log(data); // use the data how ever you like
 });
 ```

 sample output:

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
   ], // truncated for brevity
   open: 30,
   closed: 20,
   next: '/dwyl/tudo/issues?page=2&q=is%3Aissue+is%3Aopen',
   url: '/dwyl/tudo/issues'
 }
 ```

 Each issue in the list would create a entry in the crawler (worker) queue:

 ```sh
 2015-07-22T12:33:14Z issue /dwyl/tudo/issues/77
 ```

 > Should we include the "all issues by this author" link?
 + **created_by** https://github.com/dwyl/tudo/issues/created_by/iteles
 + **assignee** (assigned to): https://github.com/dwyl/tudo/issues?q=assignee%3Aiteles+is%3Aopen


 ### Issue (_individual_)

 The result of scraping https://github.com/dwyl/tudo/issues/51

 ```js
 var gs  = require('github-scraper');
 var url = '/dwyl/tudo/issues/51';
 gs(url, function (err, data) {
   console.log(data); // use the data how ever you like
 });
 ```

 sample output:

 ```js
 { entries:
    [ { id: 'issue-96442793',
        author: 'nelsonic',
        created: '2015-07-22T00:00:45Z',
        body: 'instead of waiting for people to perform the steps to authorise Tudo (to access their GitHub orgs/issues we could request their GitHub username on the login page and initiate the retrieval of their issues while they are authenticating... That way, by the time they get back to Tudo their issues dashboard is already pre-rendered and loaded! This is a wow-factor people won\'t be expecting and thus our app immediately delivers on our first promise!\n\nThoughts?' },
      { id: 'issuecomment-123807796',
        author: 'iteles',
        created: '2015-07-22T17:54:12Z',
        body: 'I\'d love to test this out, this will be an amazing selling point if we can get the performance to work like we expect!' },
      { id: 'issuecomment-124048121',
        author: 'nelsonic',
        created: '2015-07-23T10:20:15Z',
        body: '@iteles have you watched the Foundation Episode featuring Kevin Systrom (instagram) ?\n\n\nhttps://www.youtube.com/watch?v=nld8B9l1aRE\n\n\nWhat were the USPs that contributed to instagram\'s success (considering how many photo-related-apps were in the app store at the time) ?\n\ncc: @besarthoxhaj' },
      { id: 'issuecomment-124075792',
        author: 'besarthoxhaj',
        created: '2015-07-23T11:59:31Z',
        body: '@nelsonic love the idea! Let\'s do it!' } ],
   labels: [ 'enhancement', 'help wanted', 'question' ],
   participants: [ 'nelsonic', 'iteles', 'besarthoxhaj' ],
   url: '/dwyl/tudo/issues/51',
   title: 'Pre-fetch people\'s issues while they are authenticating with GitHub',
   state: 'Open',
   author: 'nelsonic',
   created: '2015-07-22T00:00:45Z',
   milestone: 'Minimal Usable Product',
   assignee: 'besarthoxhaj' }
 ```

 By contrast using the GitHub API to fetch this issue
 see: https://developer.github.com/v3/issues/#get-a-single-issue

 format:
 ```sh
 /repos/:owner/:repo/issues/:number
 ```

 ```sh
 curl https://api.github.com/repos/dwyl/tudo/issues/51
 ```

 ### Milestones

 Milestones are used to group issues into logical units.

 ![dwyl-tudo-milestones](https://cloud.githubusercontent.com/assets/194400/9010055/b3e4da72-379c-11e5-8fd3-680bf928a389.png)

 ```js
 var gs  = require('github-scraper');
 var url = '/dwyl/tudo/milestones';
 gs(url, function (err, data) {
   console.log(data); // use the data how ever you like
 });
 ```

Sample output:

 ```js
 { entries:
    [ { name: 'Test Milestone - Please Don\'t Close!',
        due: 'Past due by 16 days',
        updated: 'Last updated 5 days ago',
        desc: 'This Milestone in used in our e2e tests to check for an over-due milestone, so please don\'t close it!',
        progress: '0%',
        open: 1,
        closed: 0 },
      { name: 'Minimal Usable Product',
        due: 'Due by July  5, 2016',
        updated: 'Last updated 2 days ago',
        desc: 'What is the absolute minimum we can do to deliver value to people using the app?\n(and thus make them want to come back and use it!)',
        progress: '0%',
        open: 5,
        closed: 0 } ],
   url: 'https://github.com/dwyl/tudo/milestones',
   open: 2,
   closed: 1 }
 ```

 ### Labels (for a repository)

 All repositories have a set of standard labels (built-in to GitHub)
 e.g: https://github.com/dwyl/tudo/labels is (_currently_) only using the "*standard*" labels.

 <img width="998" alt="github-dwyl-tudo-labels-list" src="https://cloud.githubusercontent.com/assets/194400/8945752/36c87754-3582-11e5-9a46-a4a786ca7c25.png">

 Whereas the RethinkDB (which uses GitHub for all their project tracking) uses _several **custom labels**_:
 https://github.com/rethinkdb/rethinkdb/labels

 <img width="996" alt="github-rethinkdb-issues-list" src="https://cloud.githubusercontent.com/assets/194400/8945786/7b98b718-3582-11e5-961b-905d268dd39a.png">

 We need to crawl these for each repo.

```js
var gs  = require('github-scraper');
var url = '/dwyl/time/labels';
gs(url, function (err, data) {
  console.log(data); // use the data how ever you like
});
```

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

 or a repo that has ***custom labels***:

 ```js
 { entries:
   [ { name: '[alpha]',
       style: 'background-color: #79CDCD; color: #1e3333;',
       link: '/dwyl/time/labels/%5Balpha%5D',
       count: 2 },
     { name: 'API',
       style: 'background-color: #006b75; color: #fff;',
       link: '/dwyl/time/labels/API',
       count: 11 },
     { name: 'bug',
       style: 'background-color: #fc2929; color: #fff;',
       link: '/dwyl/time/labels/bug',
       count: 5 },
     { name: 'chore',
       style: 'background-color: #e11d21; color: #fff;',
       link: '/dwyl/time/labels/chore',
       count: 9 },
     { name: 'discuss',
       style: 'background-color: #bfe5bf; color: #2a332a;',
       link: '/dwyl/time/labels/discuss',
       count: 43 },
     { name: 'Documentation',
       style: 'background-color: #eb6420; color: #fff;',
       link: '/dwyl/time/labels/Documentation',
       count: 2 },
     { name: 'duplicate',
       style: 'background-color: #cccccc; color: #333333;',
       link: '/dwyl/time/labels/duplicate',
       count: 0 },
     { name: 'enhancement',
       style: 'background-color: #84b6eb; color: #1c2733;',
       link: '/dwyl/time/labels/enhancement',
       count: 27 },
     { name: 'external dependency',
       style: 'background-color: #D1EEEE; color: #2c3333;',
       link: '/dwyl/time/labels/external%20dependency',
       count: 1 },
     { name: 'FrontEnd',
       style: 'background-color: #f7c6c7; color: #332829;',
       link: '/dwyl/time/labels/FrontEnd',
       count: 26 },
     { name: 'help wanted',
       style: 'background-color: #009800; color: #fff;',
       link: '/dwyl/time/labels/help%20wanted',
       count: 42 },
     { name: 'invalid',
       style: 'background-color: #e6e6e6; color: #333333;',
       link: '/dwyl/time/labels/invalid',
       count: 0 },
     { name: 'investigate',
       style: 'background-color: #fbca04; color: #332900;',
       link: '/dwyl/time/labels/investigate',
       count: 18 },
     { name: 'MVP',
       style: 'background-color: #207de5; color: #fff;',
       link: '/dwyl/time/labels/MVP',
       count: 27 },
     { name: 'NiceToHave',
       style: 'background-color: #fbca04; color: #332900;',
       link: '/dwyl/time/labels/NiceToHave',
       count: 7 },
     { name: 'Post MVP',
       style: 'background-color: #fef2c0; color: #333026;',
       link: '/dwyl/time/labels/Post%20MVP',
       count: 24 },
     { name: 'question',
       style: 'background-color: #cc317c; color: #fff;',
       link: '/dwyl/time/labels/question',
       count: 25 },
     { name: 'UI',
       style: 'background-color: #bfdadc; color: #2c3233;',
       link: '/dwyl/time/labels/UI',
       count: 13 } ],
  url: 'https://github.com/dwyl/time/labels' }
 ```

 ### Issues > *Search* (*Bonus Feature*)

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




## Want More Examples?

If you want ***even more*** examples of the pages you can scrape,
take a look at our end-to-end tests where we *test* all the scrapers!

<br />

## Future Features / Road Map ?


### Crawl the List of commits

Would it be interesting to see/track:
+ **who** makes the most commits to the project
+ **when** (***what time*** of day/night) people do their work
+ **what** did the person contribute? (docs, code improvement, tests, typo, dependency update?)

Show your interest in this feature: https://github.com/nelsonic/github-scraper/issues/17


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

Once we know _who_ we *should* be following, we can use

- https://developer.github.com/v3/users/followers/#follow-a-user
- https://developer.github.com/v3/users/followers/#check-if-one-user-follows-another

e.g:
```sh
curl -v https://api.github.com/users/pgte/following/visionmedia
```
