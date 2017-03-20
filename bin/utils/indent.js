'use strict'

const TAB = '  '

function indent (str, count = 1, first = true) {
  return str
    .toString()
    .split('\n')
    .map((el, i) => (i === 0 && !first) ? el : TAB.repeat(count) + el)
    .join('\n')
}

module.exports = indent
