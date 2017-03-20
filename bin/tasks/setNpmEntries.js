'use strict'

const hasFormat = require('../utils/hasFormat')
const getFilename = require('../utils/getFormatFilename')

const defOpts = {
  name: 'my-module',
  formats: []
}

function addMin (filepath) {
  return filepath.slice(0, -3) + '.min.js'
}

function entry (key, filepath) {
  return '"' + key + '": ' + '"' + filepath + '"'
}

function setNpmEntries (opts) {
  opts = Object.assign({}, defOpts, opts)
  const formats = opts.formats
  let entries = []

  // Main entry
  entries.push(entry('main', 'build/' + opts.name + '.js'))

  // Browser entry
  if (hasFormat('iife', formats)) {
    let filename = addMin(getFilename(
      opts.name,
      hasFormat('umd', formats) ? 'umd' : 'iife',
      formats
    ))
    entries.push(entry('browser', filename))
  }

  // ES Module entries
  if (hasFormat('es', formats)) {
    let filename = getFilename(opts.name, 'es', formats)
    entries.push(entry('module', filename))
    entries.push(entry('jsnext:main', filename))
  }

  return entries.join(',\n')
}

module.exports = setNpmEntries
