const fs = require('fs-extra')

const errors = {
  missingArgs: new Error('You need to provide a source and a destination')
}

const defaultOpts = { clobber: false, dereference: true }

function copy (src, dest, opts = {}) {
  return new Promise((resolve, reject) => {
    if (!src || !dest) return reject(errors.missingArgs)
    const options = Object.assign({}, defaultOpts, opts)
    fs.copy(src, dest, options, err => err ? reject(err) : resolve())
  })
}

module.exports = copy
