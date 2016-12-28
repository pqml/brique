const nl = require('./functions/newIndentedLine')

let baseConfig = {
  moduleName: '',
  devDeps: ['rollup-plugin-node-resolve'],
  deps: [],
  rollupPrePlugs: '',
  rollupPostPlugs: '',
  rollupPlugImports: '',
  rollupTarget: nl(3, `format: 'cjs',`),
  rollupUmd: `'false'`
}

const questions = [
  [
    'rollup, rollup-watch and uglify-js are required. Install them locally?',
    (config) => { config.devDeps.push('rollup', 'rollup-watch', 'uglify-js') }
  ],
  [
    'Do you need to require commonjs modules?',
    (config) => {
      config.devDeps.push('rollup-plugin-commonjs')
      config.rollupPlugImports += `import commonjs from 'rollup-plugin-commonjs'\n`
      config.rollupPostPlugs += `,` + nl(2, 'commonjs({') + nl(2, '})')
    }
  ],
  [
    'Do you want UMD support?',
    (config) => {
      config.rollupUmd = `'true'`
      config.rollupTarget = nl(3, `format: 'umd',`) +
        nl(3, `moduleName: '` + config.moduleName + `',`)
    },
    false
  ],
  [
    'Do you want babel + babel-preset-es2015?',
    (config) => {
      config.babel = true
      config.devDeps.push('rollup-plugin-babel', 'babel-preset-es2015', 'babel-plugin-external-helpers')
      config.rollupPlugImports += `import babel from 'rollup-plugin-babel'\n`
      config.rollupPostPlugs += ',' +
        nl(2, `babel({`) + nl(3, `// exclude: 'node_modules/**'`) + nl(2, '})')
    },
    false
  ]
]

module.exports = {
  baseConfig,
  questions
}
