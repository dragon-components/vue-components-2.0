/**
 * @Author: dragon
 * @Date: 2019-06-20 21:20:54
 * @Desc: 销售线 注:children中的name与path必须保持一致 ace配置编码与这里children中的name一一对应
 */
import Main from '@/components/main'
// import parentView from '@/components/parent-view'

export default [{
  path: '/biReport',
  name: 'biReport',
  meta: {
    title: '销售报表'
  },
  component: Main,
  children: [
    {
      path: 'totalVisitByCust',
      name: 'totalVisitByCust',
      meta: {
        title: '客户经理拜访统计'
      },
      component: () => import('@/view/sale-app/crm/crm-list.vue')
    },
    {
      path: 'good-warn',
      name: 'good-warn',
      meta: {
        title: '围栏报警日志'
      },
      component: () => import('@/view/multilevel/level-2-2/level-3-1.vue')
    },
    {
      path: '/crm/customer',
      name: 'crmCustomer',
      meta: {
        title: '围栏报警日志'
      },
      component: () => import('@/components/index.vue')
    }
  ]
}]
