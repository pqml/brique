'use strict'

const defOpts = {
  name: 'my-module'
}

const errors = {
  noName: 'You must provide a name to create a module',
  tooLong: 'Module name can\'t contain more than 214 characters',
  badStartChar: 'Module name can only start with a lowercase alphabetic character',
  badChar: 'Module name should contain only lowercase alphanumeric characters, dots, hyphens, and underscores',
  badTrimming: 'Module name cannot contain leading or trailing spaces'
}

function validateName (opts) {
  return new Promise((resolve, reject) => {
    opts = Object.assign({}, defOpts, opts)
    if (opts.name === undefined || typeof opts.name !== 'string' || opts.name.length === 0) {
      return reject(errors.noName)
    }

    if (opts.name.length > 214) return reject(errors.tooLong)
    if (opts.name.trim() !== opts.name) return reject(errors.badTrimming)
    if (!opts.name.match(/^[a-z]/)) return reject(errors.badStartChar)
    if (!opts.name.match(/^[a-z0-9_\-.]*$/)) return reject(errors.badChar)

    resolve(opts.name)
  })
}

module.exports = validateName
