'use strict'

const isVariableValid = require('../utils/isVariableValid')
const capitalize = require('../utils/capitalize')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))
  .use(require('kool-shell/plugins/log'))

const defOpts = {
  name: 'my-module',
  formats: []
}

function promptGlobalName (def) {
  return sh.input('Global module name: (' + def + ')', {
    onSubmit: answer => {
      answer = answer === undefined || answer === '' ? def : answer
      if (isVariableValid(answer)) return answer
      sh.error('Invalid variable name: "' + answer + '"')
      return ask(def)
    }
  })
}

function setGlobalName (opts) {
  return new Promise((resolve, reject) => {
    opts = Object.assign({}, defOpts, opts)
    const def = opts.name.split('-').map(word => capitalize(word)).join('')
    if (~opts.formats.indexOf('iife') || ~opts.formats.indexOf('umd')) {
      promptGlobalName(def).then(globalName => resolve(globalName))
    } else {
      resolve(def)
    }
  })
}

module.exports = setGlobalName
