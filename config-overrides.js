const {
  override,
  addBabelPlugins,
  addWebpackAlias,
  fixBabelImports,
} = require('customize-cra');

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
  ),
};
