'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/select'))
  .use(require('kool-shell/plugins/log'))

let formats = []

function removeFormat (format, warningMsg) {
  const index = formats.indexOf(format)
  if (!~index) return
  formats.splice(index, 1)
  sh.warn(warningMsg + ' will not be used since you also choose UMD')
}

function addFormat (selection) {
  formats.push(selection.format)
}

function onSubmit () {
  if (formats === 0) {
    sh.error('You must choose at least one target format')
    return select()
  }

  if (~formats.indexOf('umd')) {
    removeFormat('cjs', 'CommonJS')
    removeFormat('amd', 'AMD')
    removeFormat('iife', 'IIFE')
  }

  return formats
}

function select () {
  return sh.select('What target formats do you need?', [
    { value: 'UMD (IIFE + CommonJS + AMD)', format: 'umd', selected: true, onChosen: addFormat },
    { value: 'ES6 (Webpack2, Rollup, JSPM)', format: 'es', selected: true, onChosen: addFormat },
    { value: 'CommonJS (NodeJS, Webpack, Browserify)', format: 'cjs', onChosen: addFormat },
    { value: 'AMD (Require.js)', format: 'amd', onChosen: addFormat },
    { value: 'IIFE (Browser)', format: 'iife', onChosen: addFormat }
  ], {
    onSubmit: onSubmit
  })
}

function selectTargetsFormats (name) {
  formats = []
  return select()
}

module.exports = selectTargetsFormats
