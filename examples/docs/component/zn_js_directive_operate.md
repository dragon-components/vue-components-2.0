# 按钮权限指令 #
```js
// 指令定义
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
```
```html
<!-- 项目中使用 -->
<button
        size="mini"
        type="text"
        v-canOperate="{code:'crmBusiness_edit'}"
        @click="visible_edit = true;">编辑
</button>
```
