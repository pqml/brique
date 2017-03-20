'use strict'

const fs = require('fs-extra')
const path = require('path')
const copy = require('../utils/copy')

const defOpts = {
  data: {},
  utils: {},
  from: process.cwd(),
  to: process.cwd()
}

function processPath (filePath, opts) {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        return reject(err)
      } else if (stats.isDirectory()) {
        return loadDir(filePath, opts).then(resolve).catch(reject)
      } else if (stats.isFile()) {
        const relPath = path.relative(opts.from, filePath)
        if (/\.template\.js$/i.test(relPath)) {
          const destPath = path.join(opts.to, relPath.slice(0, -12))
          const template = require(filePath)
          const fileData = template(opts.data, opts.utils)
          fs.outputFile(destPath, fileData, err => err ? reject(err) : resolve())
        } else {
          const destPath = path.join(opts.to, relPath)
          copy(filePath, destPath).then(resolve).catch(reject)
        }
        return resolve()
      } else {
        return resolve()
      }
    })
  })
}

function loadDir (dirPath, opts) {
  return new Promise((resolve, reject) => {
    let p = []
    fs.readdir(dirPath, (err, files) => {
      if (err) return reject(err)
      files.forEach((file) => {
        const filePath = path.join(dirPath, file)
        p.push(processPath(filePath, opts))
      })
      Promise.all(p)
        .then(resolve)
        .catch(reject)
    })
  })
}

function copyAndTemplate (opts) {
  opts = Object.assign({}, defOpts, opts)
  return loadDir(opts.from, opts)
}

module.exports = copyAndTemplate
