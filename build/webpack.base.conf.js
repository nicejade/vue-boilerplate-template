const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const svgoConfig = require('../config/svgo-config.json')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')

const env = process.env.NODE_ENV

const cssLoader = new MiniCssExtractPlugin({
  use: [
    'happypack/loader?id=happy-css'
  ]
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// inject happypack accelerate packing for vue-loader @17-08-18
Object.assign(vueLoaderConfig.loaders, {
  js: 'happypack/loader?id=happy-babel-vue',
  css: cssLoader
})

function createHappyPlugin (id, loaders) {
  return new HappyPack({
    id: id,
    loaders: loaders,
    threadPool: happyThreadPool,
    // make happy more verbose with HAPPY_VERBOSE=1
    verbose: process.env.HAPPY_VERBOSE === '1'
  })
}

module.exports = {
  entry: {
    app: './src/main.js',
    element: ['element-ui']
  },
  mode: env === 'production' ? 'production' : 'development',
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
      'vue$': 'vue/dist/vue.min.js',
      '@': resolve('src'),
      '@assets': resolve('src/assets'),
      '@constants': resolve('src/constants'),
      '@partials': resolve('src/partials'),
      '@views': resolve('src/views'),
      '@pages': resolve('src/views/pages'),
      '@components': resolve('src/components'),
      '@router': resolve('src/router'),
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
        use: [
          {
            loader: 'eslint-loader'
          }
        ],
        enforce: 'pre',
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        // css-hot-loader会增加打包的体积
        use:
          env === 'production'
            ? [MiniCssExtractPlugin.loader, 'css-loader?importLoaders=1', 'postcss-loader']
            : [
              'css-hot-loader',
              MiniCssExtractPlugin.loader,
              'css-loader?importLoaders=1',
              'postcss-loader'
            ]
      },
      {
        test: /\.css$/,
        include: [path.resolve('src')],
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
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
        include: [resolve('src')],
        exclude: /node_modules/,
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=happy-babel-js',
        exclude: /node_modules/,
        include: [resolve('src')]
      },
      {
        test: /\.svg$/,
        loader: 'happypack/loader?id=happy-svg',
        include: [resolve('src/assets/icons'), resolve('src/assets/images')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        include: [resolve('src/assets/images')],
        query: {
          limit: 8192,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 8192,
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
    createHappyPlugin('happy-babel-js', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-babel-vue', ['babel-loader?cacheDirectory=true']),
    createHappyPlugin('happy-css', ['css-loader', 'vue-style-loader']),
    createHappyPlugin('happy-svg', ['svg-sprite-loader']),
    // https://github.com/amireh/happypack/pull/131
    new HappyPack({
      loaders: [{
        path: 'vue-loader',
        query: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      }]
    }),
    new HardSourceWebpackPlugin(),
    new webpack.LoaderOptionsPlugin({ options: {} })
  ]
}
