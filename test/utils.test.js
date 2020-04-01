var test = require('tape');
var parse_int = require('../lib/utils').parse_int;

test('crawl known repository for stats', function(t) {
  t.equal(parse_int("1"), 1, '"1" => 1')
  t.equal(parse_int("  1  "), 1, '"  1  " => 1')
  t.equal(parse_int("300"), 300, '"300" => 300')
  t.equal(parse_int("4.3k"), 4300, '"4.3k" => 4300')
  t.end()
})
