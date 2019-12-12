/**
 * 引用import { request } from '@/utils/libs/api.request'
 * 使用 简单模式,
 * export const XXX = (params) => {
      return request({
        url: 'XXXX',
        method: 'get', // 默认是post请求，可省略。如果是其他请求需要设置方法
        isDebounce, // 是否要启用防抖，默认是启用
        params
      })
    }

 * 使用 需要定配置axios
    export const XXX = (params, option) => {
      return request({
        url: 'XXXX',
        params,
        ...option // 为 axios的配置项
      })
    }
 *
 */

import HttpRequest from '@/utils/libs/axios'
import config from '@/config'

const publicPath = (process.env.NODE_ENV === 'development' ? config.publicPath.dev : config.publicPath.pro) + '/zms/'
const axios = new HttpRequest(publicPath)

export const request = (...params) => {
  return axios.request(...params)
}
export default axios
