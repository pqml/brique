#! /usr/bin/env node

const path = require('path')
const sh = require('kool-shell')
const configList = require('./configQuestions')

const createSteps = require('./functions/createSteps')
const validateName = require('./functions/validateName')
const yesno = require('./functions/yesnoConfig')
const copy = require('./functions/copy')
const mkdirs = require('./functions/mkdirs')
const remove = require('./functions/remove')
const customizeFiles = require('./functions/customizeFiles')
const npmInit = require('./functions/npmInit.js')
const npmInstall = require('./functions/npmInstall.js')

const cwd = process.cwd()
const args = process.argv.splice(2)
const name = args[0]

const templatePath = path.join(__dirname, '..', 'template')
const projectPath = path.join(cwd, name)

const baseConfig = Object.assign({}, configList.baseConfig, {
  moduleName: name
})

const steps = createSteps([
  `Creating module folder...`,
  `Copying template files into ${name} folder...`,
  `Executing npm init...`,
  `Configuring ${name}...`,
  `Customizing ${name}...`,
  `Installing dependencies...`,
  `Testing Rollup...`
])

const filesToCustomize = [
  path.join(projectPath, 'package.json'),
  path.join(projectPath, 'rollup.config.js'),
  path.join(projectPath, 'examples', 'index.html')
]

validateName(name)
  .then(steps.next)
  .then(() => mkdirs(projectPath))

  .then(steps.next)
  .then(() => copy(templatePath, projectPath))

  .then(steps.next)
  .then(() => customizeFiles(path.join(projectPath, 'package.json'), baseConfig))
  .then(() => npmInit(projectPath))

  .then(steps.next)
  .then(() => yesno(baseConfig, configList.questions))

  .then(steps.next)
  .then(config => {
    if (!config.babel) {
      return new Promise((resolve, reject) => {
        remove(path.join(projectPath, '.babelrc'))
          .then(() => resolve(config))
          .catch(reject)
      })
    } else {
      return Promise.resolve(config)
    }
  })
  .then(config => {
    return customizeFiles(filesToCustomize, config)
  })

  .then(steps.next)
  .then(config => npmInstall(projectPath, config.devDeps, config.deps))

  .then(steps.next)
  .then(() => sh.exec('npm', ['run', 'build'], { cwd: projectPath }))

  .then(() => { sh.success(`⭐️  Done! Have fun building ${name}!`) })

  .catch(err => {
    function outputErr () {
      sh.error(err).exit(1)
    }

    if (steps.getCurrent() > 2) {
      sh.info('An error occured, removing created folder...')
      remove(projectPath)
        .then(() => { outputErr() })
        .catch(rmErr => sh.error(rmErr))
    } else {
      outputErr()
    }
  })
