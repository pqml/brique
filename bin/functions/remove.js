const fs = require('fs-extra')

const errors = {
  missingArgs: new Error('You need to provide a path')
}

function remove (filePath) {
  return new Promise((resolve, reject) => {
    if (!filePath) return errors.missingArgs
    fs.remove(filePath, err => err ? reject(err) : resolve())
  })
}

module.exports = remove
