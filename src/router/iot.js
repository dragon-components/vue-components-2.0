/**
 * @Author: dragon
 * @Date: 2019-06-20 21:20:15
 * @Desc: 物联网线 注:children中的name与path必须保持一致
 */
import Main from '@/components/main'
// import parentView from '@/components/parent-view'

export default [{
  path: '/finance',
  name: 'finance',
  meta: {
    title: '物联网'
  },
  component: Main,
  children: [
    {
      path: 'accountStatementList',
      name: 'accountStatementList',
      meta: {
        title: '对账单管理'
      },
      component: () => import('@/view/tables/tables.vue')
    }
  ]
}
]
