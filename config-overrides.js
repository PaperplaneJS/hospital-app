const {
  override,
  addBabelPlugins,
  addWebpackAlias,
  fixBabelImports,
  addWebpackModuleRule,
} = require('customize-cra')

module.exports = {
  webpack: override(
    addBabelPlugins(['@emotion']),

    addWebpackAlias({ '@': 'src/' }),

    fixBabelImports('mui-core', {
      libraryName: '@mui/core',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),

    fixBabelImports('mui-icon', {
      libraryName: '@mui/icon',
      libraryDirectory: '',
      camel2DashComponentName: false,
    }),

    fixBabelImports("lodash", {
      libraryDirectory: "",
      camel2DashComponentName: false
    }),

    addWebpackModuleRule({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    })
  ),
}
