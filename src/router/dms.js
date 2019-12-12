/**
 * @Author: dragon
 * @Date: 2019-06-20 21:20:54
 * @Desc: 设备线
 */
import Main from '@/components/main'
import parentView from '@/components/parent-view'

export default [{
  path: '/dms',
  name: 'dms',
  meta: {
    title: '设备生命周期管理'
  },
  component: Main,
  children: [
    {
      path: 'deviceList',
      name: 'deviceList',
      meta: {
        title: '设备列表页'
      },
      // component: () => import('@/view/dms-app/list.vue')
      component: parentView,
      children: [
        {
          path: 'third-leave',
          name: 'third-leave',
          meta: {
            title: '三级菜单'
          },
          component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
        }
      ]
    },
    {
      path: 'dmsFile',
      name: 'dmsFile',
      meta: {
        title: '文件批量上传'
      },
      component: () => import('@/view/dms-app/list.vue')
    }
  ]
}]
