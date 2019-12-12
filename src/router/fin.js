/**
 * @Author: dragon
 * @Date: 2019-06-20 21:20:15
 * @Desc: 财务线
 */
import Main from '@/components/main'
// import parentView from '@/components/parent-view'

export default [{
  path: '/finance',
  name: 'finance',
  meta: {
    title: '财务'
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
