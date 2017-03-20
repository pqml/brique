'use strict'

const path = require('path')
const fs = require('fs-extra')

const defOpts = {
  to: process.cwd(),
  files: {}
}

function createAdditionalFiles (opts) {
  return new Promise((resolve, reject) => {
    opts = Object.assign({}, defOpts, opts)
    let p = []
    for (let file in opts.files) {
      const destPath = path.join(opts.to, file)
      p.push(new Promise((resolve, reject) => {
        fs.outputFile(
          destPath,
          opts.files[file],
          err => err ? reject(err) : resolve()
        )
      }))
    }
    Promise.all(p).then(resolve).catch(reject)
  })
}

module.exports = createAdditionalFiles
