/**
 * @Author: dragon
 * @Date: 2019-06-20 21:20:15
 * @Desc: 运营线 注:children中的name与path必须保持一致
 */
import Main from '@/components/main'
// import parentView from '@/components/parent-view'

export default [{
  path: '/zmsOperateMange',
  name: 'zmsOperateMange',
  meta: {
    title: '运营管理'
  },
  component: Main,
  children: [
    {
      path: 'couponList',
      name: 'couponList',
      meta: {
        title: '对账单管理'
      },
      component: () => import('@/view/tables/tables.vue')
    }
  ]
}
]
