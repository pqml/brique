'use strict'

const hasFormat = require('../utils/hasFormat')

const defOpts = {
  entry: 'src/index.js',
  name: 'my-module',
  formats: []
}

function setNpmScripts (opts) {
  opts = Object.assign({}, defOpts, opts)
  let devDeps = [ 'rollup', 'rulo' ]
  let scripts = {
    test: 'echo "Error: no test specified" && exit 1',
    build: 'rollup -c',
    dev: 'rulo example/index.js:bundle.js -c -d example'
  }

  if (hasFormat('iife', opts.formats)) {
    devDeps.push('uglifyjs')
    scripts.build += ' && uglifyjs build/' + opts.name + '.js'
    scripts.build += ' -c -m > build/' + opts.name + '.min.js'
  }

  return { devDeps, scripts: JSON.stringify(scripts, undefined, 2) }
}

module.exports = setNpmScripts
