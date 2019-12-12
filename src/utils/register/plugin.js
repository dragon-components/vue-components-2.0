/*
 * @Descripttion:
 * @Author: xingyixiang
 * @Date: 2019-11-07 13:58:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2019-11-11 10:09:01
 */
import axios from '../service'
import request from '../../api/index.js'

var plugins = {}
for (let i = 0; i < request.length; i++) {
  if (typeof request[i] === 'object' && request[i].list && Array.isArray(request[i].list)) {
    for (let j = 0; j < request[i].list.length; j++) {
      plugins['api_' + request[i].module + '_' + request[i].list[j].method] = ((n, m) => {
        return function ({
          type = request[n].list[m].type,
          path = request[n].list[m].path,
          ...otherOption
        } = {}) {
          return axios({
            type,
            path,
            ...otherOption
          })
        }
      })(i, j)
    }
  }
}

export default plugins
