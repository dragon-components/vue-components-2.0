import base from './components/base'
import block from './components/block'
import business from './components/business'
import directive from './components/directive'
import problems from './components/problems'
import util from './components/util'
import snippet from './snippet/component'
import elementUi from './snippet/element-ui'
import design from './documents/design'
import home from './template/home'
// path 对应docs文件夹下的文件
const navConfig = [
  {
    name: '文档',
    path: '/guid',
    routes: [
      ...design
    ]
  },
  {
    name: '组件',
    path: '/component',
    routes: [
      ...base,
      ...block,
      ...business,
      ...directive,
      ...problems,
      ...util
    ]
  },
  {
    name: '代码片段',
    path: '/snippet',
    routes: [
      ...snippet,
      ...elementUi
    ]
  },
  {
    name: '模板',
    path: '/template',
    routes: [
      ...home
    ]
  }
]

export const getNavConfigByPath = (path) => {
  let config = navConfig.find((item) => {
    return item.path === path
  })
  return (config || navConfig[0]).routes
}

export default navConfig
