'use strict'

const fs = require('fs-extra')

const errors = {
  missingArgs: new Error('You need to provide a path'),
  dirExists: 'Folder already exists'
}

function mkdirs (folderPath) {
  return new Promise((resolve, reject) => {
    if (!folderPath) return errors.missingArgs
    fs.access(folderPath, fs.F_OK, (err) => {
      if (!err) return reject(errors.dirExists)
      fs.mkdirs(folderPath, err => err ? reject(err) : resolve())
    })
  })
}

module.exports = mkdirs
