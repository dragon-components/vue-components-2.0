/**
 * 运营管理模块
 * method 必须唯一
 */
import {
  host
} from '../../utils/hosts'
export default [
  {
    name: 'TPI服务-门店列表',
    method: 'list',
    path: host.tpi + '/api/v1/store/list',
    type: 'get'
  },
  {
    name: '删除门店',
    method: 'delete',
    path: host.sku + '/api/v1/product/price/delete',
    type: 'post'
  }
]
