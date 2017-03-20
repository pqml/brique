'use strict'

const jsStringEscape = require('js-string-escape')

function jsonString (str) {
  if (str === undefined) str = ''
  return '"' + jsStringEscape(str) + '"'
}

module.exports = jsonString
