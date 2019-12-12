/*
 * @Description: [按钮点击事件埋点]
 * @Author: zhangming
 * @Date: 2019-09-06 09:16:30
 * @LastEditTime: 2019-09-06 14:17:18
 * @LastEditors: dragon
 */
export default function inserted (Vue) {
  Vue.directive('dot', {
    // 钩子函数，被绑定元素插入父节点时调用 (父节点存在即可调用，不必存在于 document 中)。
    inserted (el, binding, vnode) {
      el.onclick = function (event) {
        try {
          if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
            if (!(binding.value && binding.value.id && binding.value.name)) {
              Vue.prototype.$alert(
                `【${this.innerText}】按钮点击事件埋点的[id]和[name]是必填的`,
                '埋点异常通知',
                {
                  confirmButtonText: '确定',
                  callback: action => {

                  }
                }
              )
              return
            }
          }

          let obj = binding.value
          let id = obj ? obj.id : 'click_' + new Date().getTime()
          let name = obj && obj.name ? obj.name : event.target.innerHTML
          obj['page_title'] = Vue.prototype.$dot.event.pageTitle
          obj['page_path'] = Vue.prototype.$dot.event.pageEnterPath
          Vue.prototype.$dot.event._addLog({
            'event_id': id,
            'event_name': name,
            'params': obj
          })
        } catch (error) {
          console.error(error)
          Vue.prototype.$dot.event._errors({
            error_desc: error
          })
        }
      }
    }
  })
}
