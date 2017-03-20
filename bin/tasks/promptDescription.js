'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))

function promptDescription () {
  return sh.input('Description:', { onSubmit: answer => answer.trim() })
}

module.exports = promptDescription
