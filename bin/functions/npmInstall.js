const sh = require('kool-shell')

const errors = {
  missingArgs: new Error('You need to provide a cwd to the npminstall function')
}

function install (deps, depType, cwd, silent) {
  if (deps.length === 0) return Promise.resolve()
  if (silent) {
    return sh.silentExec('npm', ['install', depType].concat(deps), { cwd })
  } else {
    return sh.exec('npm', ['install', depType].concat(deps), { cwd })
  }
}

function npmInstall (cwd, devDeps = [], deps = [], silent = false) {
  return new Promise((resolve, reject) => {
    if (cwd === undefined) return reject(errors.missingArgs)
    install(devDeps, '-D', cwd, silent)
    .then(() => install(deps, '-S', cwd, silent))
    .then(() => resolve())
    .catch(err => reject(err))
  })
}

module.exports = npmInstall
