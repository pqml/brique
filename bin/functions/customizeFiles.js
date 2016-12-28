const fs = require('fs')

const templateRegex = /(__([a-zA-Z0-9\-_]+)__)/g

function customizeFile (file, data) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (err, fileContent) => {
      if (err) return reject(err)
      const content = fileContent.replace(templateRegex, (...$) => {
        return (data && data[$[2]] !== undefined) ? data[$[2]] : $[0]
      })
      fs.writeFile(file, content, 'utf8', err => err ? reject(err) : resolve())
    })
  })
}

function customizeFiles (files, data) {
  return new Promise((resolve, reject) => {
    let p = []
    if (typeof files === 'string') files = [files]
    files.forEach((file) => p.push(customizeFile(file, data)))
    Promise.all(p)
      .then(() => resolve(data))
      .catch(reject)
  })
}

module.exports = customizeFiles
