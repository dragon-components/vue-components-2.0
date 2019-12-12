const demoConfig = require('./vue.config.examples')
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}
const API = require('./config/dev.api')
// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
// const publicPath = process.env.NODE_ENV === 'production'
//   ? '/'
//   : '/'
// see http://vuejs-templates.github.io/webpack for documentation.
// var path = require('path');

// Template version: 1.2.7
// see http://vuejs-templates.github.io/webpack for documentation.
const config = {
  // Project deployment base
  publicPath: '/',
  outputDir: 'static',
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
      .set('_c', resolve('src/components'))
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的publicPath要写为 '' ，即空字符串
  devServer: {
    // open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    // https://cli.vuejs.org/zh/config/#devserver-proxy
    proxy: {
      '/zms': {
        target: API.api,
        changeOrigin: true,
        pathRewrite: {
          '^/zms': '/'
        }
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  }
}

module.exports = process.env.NODE_DEMO === 'demo' ? demoConfig : config
