'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))
  .use(require('kool-shell/plugins/log'))

const DEFAULT_VERSION = '0.0.1'
const REGEX = /^((\w{1}|[1-9]{1}\w+)\.){2}(\w{1}|[1-9]{1}\w+)$/g

function isValid (val) {
  return REGEX.test(val)
}

function def (val) {
  return val === undefined || val === '' ? DEFAULT_VERSION : val
}

function ask () {
  return sh.input('Version: (' + DEFAULT_VERSION + ')', {
    onSubmit: answer => {
      answer = def(answer)
      if (isValid(answer)) return answer
      sh.warn('Invalid version: "' + answer + '"')
      return ask()
    }
  })
}

function promptVersion (name) {
  return ask()
}

module.exports = promptVersion
