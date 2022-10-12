const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader,
  addBabelPlugins
} = require('customize-cra')

module.exports = {
  webpack: override(
    addLessLoader({
      lessOptions: {
        noIeCompat: true,
        javascriptEnabled: true
      }
    }),

    addWebpackAlias({ '@': 'src/' }),

    addBabelPlugins(['@emotion']),

    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    })
  )
}
