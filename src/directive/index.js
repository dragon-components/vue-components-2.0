/**
 * @Author: dragon
 * @Date: 2019-06-25 19:55:51
 * @Desc: 指令统一输出
 */
import Vue from 'vue'
import directive from './directives'
import button from './button'
import tracker from './tracker'

Vue.use(button)
Vue.use(directive)
Vue.use(tracker)
