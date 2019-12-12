/**
 * 设备管理模块
 */
import {
  host
} from '../../utils/hosts'
export default [
  {
    name: '设备生命周期列表',
    method: 'serDevLifelist',
    path: host.ser + '/api/dev/lifeCycle/serDevLifelist',
    type: 'get'
  }
]
