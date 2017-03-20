'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/exec'))

const defOpts = {
  cwd: process.cwd(),
  devDeps: [],
  deps: []
}

function install (deps, depType, cwd) {
  if (deps.length === 0) return Promise.resolve()
  return sh.exec('npm', ['install', depType].concat(deps), { cwd, inherit: true })
}

function npmInstall (opts) {
  return new Promise((resolve, reject) => {
    opts = Object.assign({}, defOpts, opts)
    install(opts.devDeps, '-D', opts.cwd)
    .then(() => install(opts.deps, '-S', opts.cwd))
    .then(() => resolve())
    .catch(err => reject(err))
  })
}

module.exports = npmInstall
