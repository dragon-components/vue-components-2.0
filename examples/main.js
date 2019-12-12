import Vue from 'vue'
import App from './App'
import iView from 'iview'
import i18n from 'examples/locale'
import router from 'examples/router'
import demoBlock from 'examples/components/demo-block'
import './initPlugin'
import 'iview/dist/styles/iview.css'
import 'examples/assets/styles/index.less'
import 'highlight.js/styles/vs.css'
import 'perfect-scrollbar/css/perfect-scrollbar.css'

Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})

Vue.prototype.$eventBus = new Vue()

Vue.component('demo-block', demoBlock)

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  render: h => h(App)
})
