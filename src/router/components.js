import Main from '@/components/main'
export default [
  {
    path: '/component_guide',
    name: 'component_guide',
    meta: {
      // hideInMenu: true,
      title: '开发文档使用说明'
    },
    component: Main,
    children: [
      {
        path: 'document',
        name: 'document',
        meta: {
          // hideInMenu: true,
          title: '文档使用说明'
        },
        component: () => import('@/view/tables/tables.vue')
      },
      {
        name: 'table',
        path: 'table',
        meta: { title: '价格配置' },
        component: () => import('@/view/opr-app/program-price-list.vue')
      },
      {
        name: 'demo',
        path: 'demo',
        meta: { title: 'demo演示' },
        component: () => import('@/view/sale-app/crm/demo.vue')
      }]
  }
]
