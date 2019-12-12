import Main from '@/components/main'
// import parentView from '@/components/parent-view'

export default [{
  path: '/',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true,
    hideInBread: true,
    notCache: true
  },
  children: [
    {
      path: '/home',
      name: 'home',
      meta: {
        hideInMenu: true,
        hideInBread: true,
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/view/single-page/home')
    }
  ]
}]
