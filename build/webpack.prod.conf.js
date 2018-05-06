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
const loadMinified = require('./load-minified')
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
    maxEntrypointSize: 307200, // (300kb)
    // This option controls when webpack emits a performance hint based on individual asset size. The default value is 250000 (bytes).
    maxAssetSize: 307200
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
      // chunks: "initial"，"async"和"all"分别是：初始块，按需块或所有块；
      chunks: 'async',
      // （默认值：30000）块的最小大小
      minSize: 25600,
      // （默认值：1）分割前共享模块的最小块数
      minChunks: 1,
      // （缺省值5）按需加载时的最大并行请求数
      maxAsyncRequests: 8,
      // （默认值3）入口点上的最大并行请求数
      maxInitialRequests: 8,
      // webpack 将使用块的起源和名称来生成名称: `vendors~main.js`,如项目与"~"冲突，则可通过此值修改，Eg: '-'
      automaticNameDelimiter: '~',
      // cacheGroups is an object where keys are the cache group names.
      name: true,
      cacheGroups: {
        // 设置为 false 以禁用默认缓存组
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        commons: {
          name: "commons",
          chunks: "initial",
          minSize: 0,
          minChunks: 2,
          maxInitialRequests: 5
        },
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
          priority: -10
        }
      }
    }
    // runtimeChunk: true, adds an additonal chunk to each entrypoint containing only the runtime.
    // runtimeChunk: {
    //   name: 'manifest'
    // }
  },
  plugins: [
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
      serviceWorkerLoader: `<script type="text/javascript">${loadMinified(path.join(__dirname,
        './service-worker-prod.js'))}</script>`
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
    /*
      @desc: service worker caching, More detailed configuration:
        https://github.com/goldhand/sw-precache-webpack-plugin
    */
    new SWPrecacheWebpackPlugin({
      cacheId: 'your-app-name',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'dist/'
    }),
    new LodashModuleReplacementPlugin(),
    /*
      @desc: limit minChunkSize through MinChunkSizePlugin
      @reference: https://webpack.js.org/plugins/min-chunk-size-plugin/
    */
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 25600 // Minimum number of characters (25kb)
    }),
    /*
      @desc: 编译之后，您可能会注意到某些块太小 - 创建更大的HTTP开销，那么您可以处理像这样；
      @reference: https://webpack.js.org/plugins/limit-chunk-count-plugin/
    */
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 10 // Must be greater than or equal to one
      // minChunkSize: 1000
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
