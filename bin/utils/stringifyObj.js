'use strict'

const stringify = require('stringify-object')

const defOpts = {
  indent: '  '
}

function stringifyObj (obj, opts) {
  return stringify(obj, Object.assign({}, defOpts, opts))
}

module.exports = stringifyObj
