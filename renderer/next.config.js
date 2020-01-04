const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

module.exports = withLess({
  lessLoaderOptions: {
    javascriptEnabled: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    })

    config.module.rules.push({
      test: /\.ttf$/,
      use: ['file-loader']
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
