'use strict'

const getFormatFilename = require('../utils/getFormatFilename')
const stringifyObj = require('../utils/stringifyObj')

const defOpts = {
  name: 'my-module',
  globalName: 'MyModule',
  formats: []
}

function listTargets (opts) {
  opts = Object.assign({}, defOpts, opts)
  let targets = []

  for (let i = 0; i < opts.formats.length; i++) {
    let target = {}
    const format = opts.formats[i]
    target.format = format
    target.dest = getFormatFilename(opts.name, format, opts.formats)
    if (format === 'iife' || format === 'umd') {
      target.moduleName = opts.globalName
    }
    targets.push(target)
  }

  return stringifyObj(targets)
}

module.exports = listTargets
