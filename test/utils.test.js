var test = require('tape');
var parse_int = require('../lib/utils').parse_int;

test('crawl known repository for stats', function(t) {
  t.equal(parse_int("1"), 1, "1")
  t.end()
})
