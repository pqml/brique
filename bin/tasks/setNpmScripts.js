'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))
  .use(require('kool-shell/plugins/input'))

const getFilename = require('../utils/getFormatFilename')
const hasFormat = require('../utils/hasFormat')

const defOpts = {
  entry: 'src/index.js',
  name: 'my-module',
  moduleName: 'MyModule',
  formats: []
}

function askForScriptTag (cb) {
  const label = 'You can import your module directly in a <script> tag. \n' +
    'Do you want to bundle the code of your example anyway? (Yes)'
  return sh.input(label, {
    onSubmit: answer => {
      if (answer.match(/^n(o)?$/i)) cb()
      return answer
    }
  })
}

function setNpmScripts (opts) {
  return new Promise((resolve, reject) => {
    opts = Object.assign({}, defOpts, opts)

    let files = {}
    files['example/index.js'] = '' +
      '// import your module and create an example with it here\n' +
      'import * as ' + opts.moduleName + ' from \'../' + opts.entry + '\'\n'

    let bodyContent = '<script src ="bundle.js"></script>'


    let devDeps = [ 'rollup', 'rulo', 'ghp' ]
    let scripts = {
      test: 'echo "Error: no test specified" && exit 1',
      deploy: 'ghp example',
      build: 'rollup -c',
      dev: 'rulo' +
      ' -i example/index.js' +
      ' -o bundle.js' +
      ' -f iife' +
      ' -d example' +
      ' -W' +
      ' -c' +
      ' -- -m'
    }

    if (hasFormat('iife', opts.formats)) {
      devDeps.push('uglifyjs')
      scripts.build += ' && uglifyjs build/' + opts.name + '.js'
      scripts.build += ' -c -m > build/' + opts.name + '.min.js'
      askForScriptTag(() => {
        files = {}
        scripts.dev = 'rulo -i ' + opts.entry +
          ' -o ' + opts.name + '.min.js' +
          ' -f iife' +
          ' -d example' +
          ' -n ' + opts.moduleName +
          ' -W' +
          ' -c' +
          ' -- -m'
        bodyContent = '<script src="' + opts.name + '.min.js"></script>\n' +
          '<script>\n  // Code your example here\n</script>'
      }).then(() => {
        return resolve({
          devDeps,
          scripts: JSON.stringify(scripts, undefined, 2),
          bodyContent,
          files
        })
      })
    } else {
      return resolve({
        devDeps,
        scripts: JSON.stringify(scripts, undefined, 2),
        bodyContent,
        files
      })
    }
  })
}

module.exports = setNpmScripts
