var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var svgoConfig = require('../config/svgo-config.json')
var ProgressBarPlugin = require('progress-bar-webpack-plugin')
var HappyPack = require('happypack')
var os = require('os')
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

function createHappyPlugin (id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    // disable happy caching with HAPPY_CACHE=0
    cache: process.env.HAPPY_CACHE !== '0',
    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1'
  })
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@constants': resolve('src/constants'),
      '@partials': resolve('src/partials'),
      '@views': resolve('src/views'),
      '@pages': resolve('src/views/pages'),
      '@components': resolve('src/components'),
      '@store': resolve('src/store'),
      '@helper': resolve('src/helper'),
      '@services': resolve('src/services'),
      '@mixins': resolve('src/mixins')
    }
  },
  module: {
    noParse: /node_modules\/(element-ui\.js)/,
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.svg$/,
        enforce: 'pre',
        loader: 'svgo-loader?' + JSON.stringify(svgoConfig),
        include: /assets\/icons/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: [resolve('src'), resolve('test')],
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happybabel',
        exclude: /node_modules/,
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        loader: 'happypack/loader?id=happysvg',
        include: [resolve('src/assets/icons'), resolve('src/assets/images')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: [resolve('src/assets/images')],
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)'
    }),
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname, '..'),
      manifest: require('./vendor-manifest.json')
    }),
    createHappyPlugin('happybabel', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happysvg', ['svg-sprite-loader']),
    new HappyPack({
      loaders: [{
        path: 'vue-loader',
        query: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            js: 'happypack/loader?id=happyvue'
          }
        }
      }]
    })
  ]
}
