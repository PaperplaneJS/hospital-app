const { override, addWebpackAlias } = require('customize-cra')

module.exports = {
  webpack: override(addWebpackAlias({ '@': 'src/' }))
}
