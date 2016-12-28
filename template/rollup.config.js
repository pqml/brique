import nodeResolve from 'rollup-plugin-node-resolve'
__rollupPlugImports__
const rollupConfig = {
  entry: 'src/index.js',
  indent: '\t',
  plugins: [__rollupPrePlugs__
    nodeResolve({
      main: true,
      module: true,
      browser: __rollupUmd__,
      skip: [],
      extensions: ['.js', '.json']
    })__rollupPostPlugs__
  ],
  sourceMap: false,
  targets: [
    {__rollupTarget__
      dest: 'build/__moduleName__.js'
    },
    {
      format: 'es',
      dest: 'build/__moduleName__.module.js'
    }
  ]
}

export default rollupConfig
/*
    nodeResolve({
      main: true,
      module: true,
      browser: true,
      skip: [],
      extensions: ['.js', '.json']
    })
 */