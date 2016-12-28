const sh = require('kool-shell')

const errors = {
  missingArgs: new Error('You need to provide a cwd to the npminit function')
}

function npmInit (cwd) {
  if (cwd === undefined) return Promise.reject(errors.missingArgs)
  return sh.exec('npm', ['init'], { cwd })
}

module.exports = npmInit
