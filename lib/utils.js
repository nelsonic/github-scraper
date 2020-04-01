

function parse_int (str) {
  return parseInt(
    str
    .trim()
    .replace(/\.(\d)k$/, "$100") // $1 match the digit \d
    .replace(/k$/, "000")
    .replace(/\.(\d)m$/, "$100000") // $1 match the digit \d
    .replace(/m$/, "000000")
    .replace(/[^0-9]/g, '')
  , 10)
}

/**
 * A library of utility functions for parsing web data.
 */
module.exports = {
  parse_int: parse_int
}
