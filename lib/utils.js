function parse_int (str) {
  return parseInt(
    str
    .trim()
    .replace(/\.(\d)k$/, "$100") // $1 match the digit \d
    .replace(/k$/, "000")
    .replace(/[^0-9]/g, '')
  , 10)
}

module.exports = {
  parse_int: parse_int
}
