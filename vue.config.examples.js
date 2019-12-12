'use strict'
const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    examples: {
      entry: './examples/main.js',
      filename: 'index.html'
    }
  },
  // Project deployment base
  publicPath: '/',
  outputDir: 'static',
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // 如果你不需要使用eslint，把lintOnSave设为false即可
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    config.resolve.alias
      .set('examples', resolve('examples'))
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        compilerOptions: {
          preserveWhitespace: false
        }
      })
      .end()
      .use(resolve('loader/md-loader/index.js'))
      .loader(resolve('loader/md-loader/index.js'))
      .end()
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的publicPath要写为 '' ，即空字符串
  devServer: {
    // open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8579,
    https: false,
    hotOnly: false,
    disableHostCheck: true,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    // https://cli.vuejs.org/zh/config/#devserver-proxy
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
