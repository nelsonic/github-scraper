const test = require('tape');
const parse_int = require('../lib/utils').parse_int;

test('parse_int Parses Strings from repo stats into Ints', function(t) {
  t.equal(parse_int("1"), 1, '"1" => 1')
  t.equal(parse_int("  1  "), 1, '"  1  " => 1')
  t.equal(parse_int("300"), 300, '"300" => 300')
  t.equal(parse_int("1k"), 1000, '"1k" => 1000')
  t.equal(parse_int("4.3k"), 4300, '"4.3k" => 4300')
  t.equal(parse_int("89.6k"), 89600, '"89.6k" => 89600')
  t.equal(parse_int("146k"), 146000, '"146k" => 146000')
  t.equal(parse_int("310k"), 310000, '"310k" => 310000')
  t.equal(parse_int("1m"), 1000000, '"1m" => 1000000')
  t.equal(parse_int("1.1m"), 1100000, '"1.1m" => 1100000')
  t.end()
})
