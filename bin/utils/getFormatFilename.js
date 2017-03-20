'use strict'

const BUILD_DIR = 'build'

// Ordered in main filename preference
const SUFFIXES = {
  'umd': '.umd',
  'cjs': '.cjs',
  'iife': '.iife',
  'es': '.es',
  'amd': '.amd'
}

function getFormatFilename (moduleName, format, formats) {
  let filename = BUILD_DIR + '/' + moduleName
  let keys = Object.keys(SUFFIXES)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (~formats.indexOf(key)) {
      if (format !== key) filename += SUFFIXES[format]
      break
    }
  }
  filename += '.js'
  return filename
}

module.exports = getFormatFilename
