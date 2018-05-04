const fs = require('fs')
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const Jarvis = require('webpack-jarvis')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  // @desc: Documenttion: https://webpack.js.org/configuration/performance/
  performance: {
    // Given an asset is created that is over 250kb；false | "error" | "warning"(Default)
    hints: 'warning',
    // The default value is 250000 (bytes).
    maxEntrypointSize: 288888,
    // This option controls when webpack emits a performance hint based on individual asset size. The default value is 250000 (bytes).
    maxAssetSize: 288888
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: config.build.productionSourceMap // set to true if you want JS source maps
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin({})
    ],
    // @desc:  Documentation：https://www.webpackjs.com/plugins/split-chunks-plugin/
    splitChunks: {
      chunks: 'async',
      // （默认值：30000）块的最小大小
      minSize: 30000,
      // （默认值：1）分割前共享模块的最小块数
      minChunks: 2,
      // （缺省值5）按需加载时的最大并行请求数
      maxAsyncRequests: 8,
      // （默认值3）入口点上的最大并行请求数
      maxInitialRequests: 6,
      // webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
      automaticNameDelimiter: '~',
      name: true,
      // cacheGroups is an object where keys are the cache group names.
      cacheGroups: {
        default: false,
        // 创建一个 commons 块，其中包括入口点之间共享的所有代码
        commons: {
          name: 'commons',
          chunks: 'async',
          minChunks: 5,
          maxInitialRequests: 6, // The default limit is too small to showcase the effect
          minSize: 60000 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules\/(.*)\.js/,
          chunks: 'initial',
          name: 'vendor',
          // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
          priority: -10,
          enforce: true
        },
        styles: {
          name: 'styles',
          test: /\.(scss|css)$/,
          chunks: 'all',
          minChunks: 1,
          // 选项reuseExistingChunk允许重复使用现有的块，而不是在模块完全匹配时创建新的块
          reuseExistingChunk: true,
          enforce: true
        }
      }
    },
    // runtimeChunk: true, adds an additonal chunk to each entrypoint containing only the runtime.
    runtimeChunk: {
      name: 'manifest'
    }
  },
  plugins: [
    // new webpack.optimize.ModuleConcatenationPlugin(),
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          warnings: false,
          drop_console: true
        }
      }
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.ejs',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via splitChunks
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script>${fs.readFileSync(path.join(__dirname,
        './service-worker-prod.js'), 'utf-8')}</script>`
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dist/*.dll.js')
    }),
    // copy custom static assets
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.build.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ]),
    // service worker caching
    new SWPrecacheWebpackPlugin({
      cacheId: 'my-vue-app',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'dist/'
    }),
    new LodashModuleReplacementPlugin(),
    /*
      @desc:
      @reference: https://webpack.js.org/plugins/min-chunk-size-plugin/
    */
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 18000 // Minimum number of characters
    })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

if (config.build.bundleIntelligentDashboard) {
  webpackConfig.plugins.push(new Jarvis({
    port: 1337 // optional: set a port.
  }))
}

module.exports = webpackConfig
