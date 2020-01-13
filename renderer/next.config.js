const withLess = require('./config/withLess')
const withCss = require('./config/withCSS')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const isProd = (process.env.NODE_ENV || 'production') === 'production'

module.exports = withCss(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true
    },
    assetPrefix: isProd ? '/zaku/' : '',
    webpack(config) {
      config.module.rules = [
        ...config.module.rules,
        {
          test: /\.ttf$/,
          use: [
            'file-loader?outputPath=static/css&publicPath=/_next/static/css'
          ]
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: ['url-loader']
        }
      ]

      config.plugins.push(
        new MonacoWebpackPlugin({
          publicPath: '_next',
          filename: `static/[name].worker.js`
        })
      )

      // return Object.assign(config, {
      //   target: 'electron-renderer',
      //   devtool: 'cheap-module-source-map',
      //   plugins: config.plugins.filter(p => {
      //     return p.constructor.name !== 'UglifyJsPlugin'
      //   })
      // })
      return config
    },
    useFileSystemPublicRoutes: false,
    exportPathMap() {
      return {
        '/main': { page: '/main' },
        '/': { page: '/main' }
      }
    }
  })
)
