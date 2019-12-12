/**
 * @Author: dragon
 * @Date: 2019-06-25 19:41:59
 * @Desc: 按钮权限指令
 */
// import store from '@/store'
import { getJSONStore } from '@/utils/localStorage'
export default function install (Vue) {
  Vue.directive('canOperate', function (el, binding) {
    let btnList = getJSONStore('buttonStatusList')
    // let $store = store.state.main.buttonStatusList.length
    let code = binding.value && binding.value.code &&
    btnList.length && btnList.forEach(item => {
      if (item.code && item.code.trim() + '' === code.trim() + '' && el.parentNode) {
        el.parentNode.removeChild(el)
      }
    })
  })
}
