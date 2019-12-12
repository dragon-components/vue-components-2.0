import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../pages/Layout'
import hljs from 'highlight.js'
import navConfig, { getNavConfigByPath } from '../router/navConfig'

const findFirstRoute = (lists) => {
  let fistNav = lists.find(item => item.children.length > 0)
  let page = fistNav.children[0]
  return page.path
}

const routeLists = (config) => {
  return config.reduce((pre, item) => {
    return pre.concat(item.children)
  }, [])
}

let routes = []

const addRoute = (path, index) => {
  debugger
  let lists = getNavConfigByPath(path)
  routes[index] = {
    path: path,
    component: Layout,
    children: routeLists(lists).map(page => {
      return {
        path: page.path,
        meta: {
          title: page.name
        },
        name: 'component-' + page.name,
        component: () => {
          debugger
          if (page.path.indexOf('.vue') > -1) {
            return import(`examples/docs${path}/${page.path}`)
          } else {
            return import(`examples/docs${path}/${page.path}.md`)
          }
        }
      }
    })
  }
}

const registerRoute = () => {
  navConfig.forEach((item, index) => {
    addRoute(item.path, index)
  })
}

registerRoute()

Vue.use(Router)
const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const matched = to.matched
  let typeName = navConfig[0].path
  if (matched[0]) {
    typeName = matched[0].path
  }
  if (matched.length < 2) {
    let lists = getNavConfigByPath(typeName)
    next({ path: `${typeName}/${findFirstRoute(lists)}` })
    return
  }
  next()
})

router.afterEach(() => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)')
    Array.prototype.forEach.call(blocks, hljs.highlightBlock)
  })
})

export default router
