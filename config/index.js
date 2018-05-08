// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

/* ~~~~~~~~~~~~~~~~~~~~~~~~@CHANGE@~~~~~~~~~~~~~~~~~~~~~~~~ */
// You can specify a specific path prefix based on your deployment.
const STATIC_PATH = '/' // Example: 'https://your-domain-name/'
const publicPathPrefix = process.env.NODE_ENV === 'production' ? STATIC_PATH : '/'

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: publicPathPrefix,
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    bundleIntelligentDashboard: process.env.npm_config_dashboard
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
       // (💛)If the agent's protocol is http, you can configure like this:
      '/api': 'http://localhost:3000',
      // [‼️💯💞]If the proxy protocol is https, you need to configure this：
      '/api/v1': {
        target: {
          host: 'google.com',
          protocol: 'https:',
          port: 443
        },
        changeOrigin: true,
        logLevel: 'info',
        secure: false
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
