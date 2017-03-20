'use strict'
module.exports = function (data, utils) {
  return (

`${data.rollup.pluginImports}

const rollupConfig = {
  entry: 'src/index.js',
  plugins: ${utils.indent(data.rollup.plugins, 1, false)},
  targets: ${utils.indent(data.rollup.targets, 1, false)},
  indent: '  ',
  sourceMap: false
}

export default rollupConfig
`

  )
}
