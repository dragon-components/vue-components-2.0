/**
 * @Author: dragon
 * @Date: 2019-06-22 23:35:34
 * @Desc: init main
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './utils/register'
import router from './router'
import store from './store'
import iView from 'view-design'
import i18n from '@/locale'
import config from '@/config'
import './directive'
import installPlugin from '@/plugin'
// import 'iview/dist/styles/iview.css'
import '../src/assets/style/less/index.less'
import '@/assets/icons/iconfont.css'
import ZnBaseTable from '@mobile-component/zn_vue_ui_basetable'
import ZnBasePage from '@mobile-component/zn_vue_ui_basepage'
import ZnBaseFilter from '@mobile-component/zn_vue_ui_basefilter'
// import ZNDOT from '@mobile-component/zn_js_utl_dot' // 引入数据采集 skd

// 实际打包时不引入mock 模拟的时候放开此处代码
/* eslint-disable */
// if (process.env.NODE_ENV !== 'production') require('@/mock')
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
/**
 * @description 搜索组件
 */
Vue.use(ZnBaseFilter)
/**
 * @description 列表组件
 */
Vue.use(ZnBaseTable)
/**
 * @description 分页组件
 */
Vue.use(ZnBasePage)
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/** 
 * @Desc: 数据埋点 
 */
// let znDot = new ZNDOT(getToken(), {
//       appId: "zms",
//       version: "1.0.0",
//       SPA: {
//           is: true,
//           mode: router.mode,
//           route: router
//       },
//       sended: (params, clear) => {
//           axios({
//               method: "post",
//               baseURL: "/zms",
//               url: "/api-msc/api/v1/pipeline/passFlag/collectLog",
//               data: params, //qs.stringify(data),
//               timeout: 10000,
//               headers: {
//                   "REQUEST-SOURCE": "3",
//                   "X-Auth-Token": getToken()
//               }
//           })
//           .then(res => {
//               if (res && res.status === 200 && res.data && res.data.errCode === 0) {
//                   clear()
//               }else{

//               }
//           })
//           .catch(err => {
//             znDot.event._errors({
//               error_desc: error
//             })
//             console.error(err)
//         })
//       }
//     })
// Vue.prototype.$dot = znDot
// store.dispatch('setDot', znDot)
// localStorage.setItem('dot', znDot)
/**
 * 注册指令
 */
// importDirective(Vue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
