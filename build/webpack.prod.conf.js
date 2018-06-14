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
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')
const loadMinified = require('./load-minified')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const Jarvis = require('webpack-jarvis')

const env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },

  devtool: config.build.productionSourceMap ? '#source-map' : false,
  // @desc: Documenttion: https://webpack.js.org/configuration/performance/

  performance: {
    // Given an asset is created that is over 250kb；false | "error" | "warning"(Default)
    hints: 'warning',
    // The default value is 250000 (bytes).
    maxEntrypointSize: 500000, // (300kb)
    // This option controls when webpack emits a performance hint based on individual asset size. The default value is 250000 (bytes).
    maxAssetSize: 500000
  },

  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },

  optimization: {
    /*
      @desc: Setting optimization.runtimeChunk to true adds an additonal chunk to each entrypoint containing only the runtime.
        The value single instead creates a runtime file to be shared for all generated chunks.
      @reference: https://doc.webpack-china.org/plugins/split-chunks-plugin/#optimization-runtimechunk
    */
    // runtimeChunk: {
    //   name: 'manifest'
    // }
  },

  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),

    /*
      @desc: A faster uglifyjs plugin.(用来替代 Webpack `uglifyjs-webpack-plugin`)
      @reference: https://github.com/gdborton/webpack-parallel-uglify-plugin
    */
    new ParallelUglifyPlugin({
      cacheDir: '.cache/',
      uglifyJS: {
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),

    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSAssetsPlugin({}),

    // @desc:  Documentation：https://www.webpackjs.com/plugins/split-chunks-plugin/
    new webpack.optimize.SplitChunksPlugin({
      // chunks: "initial"，"async"和"all"分别是：初始块，按需块或所有块；
      chunks: 'all',
      // （默认值：30000）块的最小大小
      minSize: 30000,
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
        default: false,
        element: {
          name: 'element',
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          chunks: 'initial',
          // 默认组的优先级为负数，以允许任何自定义缓存组具有更高的优先级（默认值为0）
          priority: -10
        }
      }
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
        // @reference: https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via splitChunks
      chunksSortMode: 'dependency',
      serviceWorkerLoader: `<script type="text/javascript">${loadMinified(path.join(__dirname,
        './service-worker-prod.js'))}</script>`
    }),

    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, 'dist/*.dll.js')
    }),

    // copy custom static assets (已在 build.js 中通过 Shell 做了，所以可不用此插件;)
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.build.assetsSubDirectory,
    //     ignore: ['.*']
    //   }
    // ]),

    /*
      @desc: service worker caching, More detailed configuration:
      @reference: https://github.com/goldhand/sw-precache-webpack-plugin
    */
    new SWPrecacheWebpackPlugin({
      cacheId: 'your-app-name',
      filename: 'service-worker.js',
      staticFileGlobs: ['dist/**/*.{js,html,css}'],
      minify: true,
      stripPrefix: 'dist/'
    }),

    /*
      @desc: limit minChunkSize through MinChunkSizePlugin
      @reference: https://webpack.js.org/plugins/min-chunk-size-plugin/
    */
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 30000 // Minimum number of characters (25kb)
    }),

    /*
      @desc: AggressiveSplittingPlugin 可以将 bundle 拆分成更小的 chunk;
        直到各个 chunk 的大小达到 option 设置的 maxSize,它通过目录结构将模块组织在一起
      @reference: https://doc.webpack-china.org/plugins/aggressive-splitting-plugin/
      @but: 由于 HtmlWebpackPlugin 插件中的错误，此方法在启用时不起作用;
        具体可参见：https://github.com/jantimon/html-webpack-plugin/issues/446
    */
    // new webpack.optimize.AggressiveSplittingPlugin({
    //   minSize: 10000,
    //   maxSize: 500000
    // }),

    /*
      @desc: 编译之后，您可能会注意到某些块太小 - 创建更大的HTTP开销，那么您可以处理像这样；
      @reference: https://webpack.js.org/plugins/limit-chunk-count-plugin/
    */
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 10 // Must be greater than or equal to one
      // minChunkSize: 1000
    }),

    // 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段;
    new webpack.NoEmitOnErrorsPlugin(),

    /*
      @desc: 提升代码在浏览器中的执行速度: 作用域提升(scope hoisting)；
      @reference: https://doc.webpack-china.org/plugins/module-concatenation-plugin/
    */
    new webpack.optimize.ModuleConcatenationPlugin()
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
    port: 1337
  }))
}

module.exports = webpackConfig
