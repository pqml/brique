'use strict'

const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/input'))

const hasFormat = require('../utils/hasFormat')
const stringifyObj = require('../utils/stringifyObj')
const indent = require('../utils/indent')

const defOpts = {
  name: 'my-module',
  globalName: 'MyModule',
  formats: []
}

const defOut = {
  devDeps: [],
  imports: '',
  pluginFn: '[]'
}

const BABELRC = {
  presets: [[ 'es2015', { modules: false } ]],
  plugins: ['external-helpers']
}

function createImportStatement (varName, moduleName) {
  return 'import ' + varName + ' from \'' + moduleName + '\'' + '\n'
}

function createPluginFn (varName, optsObj) {
  return varName + '(' + stringifyObj(optsObj, {inlineCharacterLimit: 25}) + ')'
}

function pluginManager () {
  const api = {
    devDeps: [],
    imports: '',
    functions: '[]',
    add
  }
  const plugins = []
  return api

  function add (varName, moduleName, optsObj) {
    api.devDeps.push(moduleName)
    api.imports += createImportStatement(varName, moduleName)
    plugins.push(createPluginFn(varName, optsObj || {}))
    api.functions = '[\n' + indent(plugins.join(',\n')) + '\n]'
  }
}

function promptTranspilation (cb) {
  const label = 'Do you want babel and babel-preset-es2015? (Yes)'
  return sh.input(label, {
    onSubmit: answer => {
      if (!answer.match(/^n(o)?$/i)) cb()
      return answer
    }
  })
}

function setRollupPlugins (opts) {
  return new Promise((resolve, reject) => {
    opts = Object.assign({}, defOpts, opts)
    let out = Object.assign({}, defOut)
    const plugins = pluginManager()
    const devDeps = []
    const files = {}

    plugins.add(
      'nodeResolve',
      'rollup-plugin-node-resolve',
      {
        main: true,
        module: true,
        browser: hasFormat('iife', opts.formats),
        skip: [],
        extensions: ['.js', '.json']
      }
    )

    plugins.add(
      'commonjs',
      'rollup-plugin-commonjs',
      {}
    )

    promptTranspilation(() => {
      plugins.add(
        'babel',
        'rollup-plugin-babel',
        { exclude: 'node_modules/**' }
      )
      files['.babelrc'] = JSON.stringify(BABELRC, undefined, 2)
      devDeps.push('babel-preset-es2015', 'babel-plugin-external-helpers')
    })
      .then(() => {
        out.files = files
        out.imports = plugins.imports.trim()
        out.plugins = plugins.functions
        out.devDeps = devDeps.concat(plugins.devDeps)
        resolve(out)
      })
      .catch(reject)
  })
}

module.exports = setRollupPlugins
