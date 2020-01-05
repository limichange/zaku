const withLess = require('./config/withLess')
const withCss = require('./config/withCSS')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = withCss(
  withLess({
    lessLoaderOptions: {
      javascriptEnabled: true
    },
    webpack(config) {
      config.module.rules = [
        ...config.module.rules,
        {
          test: /\.ttf$/,
          use: ['file-loader?outputPath=static']
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

      return Object.assign(config, {
        target: 'electron-renderer',
        devtool: 'cheap-module-source-map',
        plugins: config.plugins.filter(p => {
          return p.constructor.name !== 'UglifyJsPlugin'
        })
      })
    },
    useFileSystemPublicRoutes: false,
    exportPathMap() {
      return {
        '/main': { page: '/main' }
      }
    }
  })
)
