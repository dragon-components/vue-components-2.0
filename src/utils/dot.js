import { getToken } from '@/utils/libs/util'
import router from '@/router'
import axios from 'axios'
import ZNDOT from '@mobile-component/zn_js_utl_dot' // 引入数据采集 skd
export function znDot () {
  return new ZNDOT(getToken(), {
    appId: 'zms',
    version: '1.0.0',
    SPA: {
      is: true,
      mode: router.mode,
      route: router
    },
    sended: (params, clear) => {
      axios({
        method: 'post',
        baseURL: '/zms',
        url: '/api-msc/api/v1/pipeline/passFlag/collectLog',
        data: params, // qs.stringify(data),
        timeout: 10000,
        headers: {
          'REQUEST-SOURCE': '3',
          'X-Auth-Token': getToken()
        }
      })
        .then(res => {
          if (res && res.status === 200 && res.data && res.data.errCode === 0) {
            clear()
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
  })
}
