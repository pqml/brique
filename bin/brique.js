#! /usr/bin/env node

'use strict'

const path = require('path')
const fs = require('fs-extra')

const briqueVersion = require('../package.json').version
const jsonString = require('./utils/jsonString')
const mkdirs = require('./utils/mkdirs')
const indent = require('./utils/indent')

const colors = require('kool-shell/utils/colors')
const sh = require('kool-shell')()
  .use(require('kool-shell/plugins/log'))
  .use(require('kool-shell/plugins/exit'))
  .use(require('kool-shell/plugins/cleanup'))

const validateName = require('./tasks/validateName')
const promptDescription = require('./tasks/promptDescription')
const promptVersion = require('./tasks/promptVersion')
const promptAuthor = require('./tasks/promptAuthor')
const selectTargetsFormats = require('./tasks/selectTargetsFormats')
const setGlobalName = require('./tasks/setGlobalName')
const listTargets = require('./tasks/listTargets')
const setRollupPlugins = require('./tasks/setRollupPlugins')
const setNpmScripts = require('./tasks/setNpmScripts')
const setNpmEntries = require('./tasks/setNpmEntries')
const copyAndTemplate = require('./tasks/copyAndTemplate')
const createAdditionalFiles = require('./tasks/createAdditionalFiles')
const npmInstall = require('./tasks/npmInstall')

const args = process.argv.splice(2)
const name = args[0]
const projectPath = path.join(process.cwd(), name)
const templatePath = path.join(__dirname, '..', 'template')
const entry = 'src/index.js'

let files = {}
let devDeps = []
let formats = []
let utils = { indent }
let data = {
  pkgjson: {},
  rollup: {}
}

function removeProjectFolder () {
  fs.removeSync(projectPath)
}

Promise.resolve()

  .then(() => process.stdout.write('\n'))
  .then(() => sh.info(colors.gray('👋  brique version ' + briqueVersion)))
  .then(() => validateName({ name }))
  .then(() => sh.info('You\'re about to create ' + colors.yellow(name) + '\n'))

  .then(() => mkdirs(projectPath))
  .then(() => { sh.on('cleanup', removeProjectFolder) })

  // NPM package.json > basic keys
  .then(() => { data.pkgjson.name = jsonString(name) })
  .then(() => promptDescription())
  .then(description => { data.pkgjson.description = jsonString(description) })
  .then(() => promptVersion())
  .then(version => { data.pkgjson.version = jsonString(version) })
  .then(() => promptAuthor())
  .then(author => { data.pkgjson.author = jsonString(author) })

  // Rollup > config related tasks
  .then(() => { data.rollup.entry = entry })
  .then(() => selectTargetsFormats())
  .then(targetFormats => { formats = targetFormats })
  .then(() => setGlobalName({ name, formats }))
  .then(globalName => { data.rollup.globalName = globalName })
  .then(() => listTargets({ name, formats, globalName: data.rollup.globalName }))
  .then(targets => { data.rollup.targets = targets })
  .then(() => setRollupPlugins({ name, formats, globalName: data.rollup.globalName }))
  .then(pluginsData => {
    devDeps = devDeps.concat(pluginsData.devDeps)
    Object.assign(files, pluginsData.files)
    data.rollup.plugins = pluginsData.plugins
    data.rollup.pluginImports = pluginsData.imports
  })

  // NPM package.json > add scripts
  .then(() => setNpmScripts({ entry, name, formats }))
  .then(scriptsData => {
    devDeps = devDeps.concat(scriptsData.devDeps)
    data.pkgjson.scripts = scriptsData.scripts
  })

  // NPM package.json > add differents entry files
  .then(() => setNpmEntries({ name, formats }))
  .then(entries => { data.pkgjson.entries = entries })

  // Global data like name, description, bundle for template
  .then(() => { data.moduleName = name })

  // File manipulation
  .then(() => copyAndTemplate({ data, utils, from: templatePath, to: projectPath }))
  .then(() => createAdditionalFiles({ to: projectPath, files }))

  // NPM Install
  .then(() => sh.info(colors.gray('\nInstalling dev dependencies via NPM...')))
  .then(() => sh.info(colors.gray('This can be a bit long ! ⏳\n')))
  .then(() => npmInstall({ cwd: projectPath, devDeps }))

  .then(() => process.stdout.write('\n'))
  .then(() => sh.success('✨  Your folder is ready!'))
  .then(() => sh.success('Have some fun building ' + colors.yellow(name) + '!'))
  .then(() => { sh.removeListener('cleanup', removeProjectFolder) })

  .catch(err => {
    sh.error(err)
    sh.exit(1)
  })
