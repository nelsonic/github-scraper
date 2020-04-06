/**
 * `parse_int` parses a String e.g: 1.2k and returns an Int 1200
 *  @param {String} str - the string to be parsed. e.g: "14.7k"
 *  @return {Number} int - the integer representation of the String.
 */
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
