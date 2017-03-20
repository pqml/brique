'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))
  .use(require('kool-shell/plugins/exec'))

function prompt (author) {
  const def = author && author !== '' ? author : false
  const label = def ? 'Author: (' + def + ')' : 'Author:'
  return sh.input(label, {
    onSubmit: answer => def && (!answer || answer === '') ? def : answer
  })
}

function promptAuthor () {
  return new Promise((resolve, reject) => {
    sh.silentExec('git', ['config', 'user.name'])
      .then(out => out.stdout)
      .catch(out => '')
      .then(prompt)
      .then(resolve)
  })
}

module.exports = promptAuthor
