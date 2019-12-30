const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

module.exports = withCSS(
  withLess({
    webpack(config) {
      config.module.rules.forEach(rule => {
        if (Array.isArray(rule.use)) {
          rule.use.forEach(u => {
            if (u.loader === 'css-loader' && u.options) {
              delete u.options.minimize
            }
          })
        }
      })

      return Object.assign(config, {
        target: 'electron-renderer',
        devtool: 'cheap-module-source-map',
        plugins: config.plugins.filter(p => {
          return p.constructor.name !== 'UglifyJsPlugin'
        })
      })
    },
    exportPathMap() {
      return {
        '/main': { page: '/main' }
      }
    }
  })
)
