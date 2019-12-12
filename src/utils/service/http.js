/*
 * @Descripttion:
 * @Author: xingyixiang
 * @Date: 2019-11-08 18:33:26
 * @LastEditors: xingyixiang
 * @LastEditTime: 2019-11-09 18:24:52
 */

/**
 * create by dragon
 * 2019/05/30
 * init http
 */
import { request } from '@/utils/libs/api.request'
import { httpDebounce } from '@/utils/libs/axios'
import { Message } from 'iview'
/**
 * 封装axios的通用请求
 * @param  {string}   type      get或post
 * @param  {string}   url       请求的接口URL
 * @param  {object}   params      传的参数，没有则传空对象
 * @param  {string}   requestType 请求类型为getString时，参数拼在路由后面
 * @param  {string}   isDebounce 是否开启防抖
 */
export default function ({
  type,
  path,
  params,
  headers = {},
  responseType,
  isDebounce
} = {}) {
  var options = {
    method: type,
    url: path,
    params,
    isDebounce
  }
  if (responseType && typeof responseType === 'object') {
    options.responseType = responseType
  }
  // 检测接口权限
  if (type === 'export') {
    Object.assign(headers, {
      'Content-Type': 'application/x-download; charset=UTF-8',
      'Content-Disposition': 'attachment'
    })
    options.responseType = 'blob'
    options.method = 'get'
  }
  options.headers = headers
  return new Promise((resolve, reject) => {
    // 发送请求
    request(options).then((response) => {
      // 判断网络状态
      if (response && (+response.status === 200)) {
        if (response.data.meta) {
          if (response.data.meta.success) {
            resolve(response.data)
            return
          }
          let { errCode } = response.data
          Message.error(errCode + ':' + response.data.meta.message)
          reject(errCode)
          return
        }
        resolve(response.data)
        return
      }
      const errMessage = '系统异常，请联系管理员！'
      Message.error(errMessage)
      reject(errMessage)
    }).catch((err) => {
      if (err === httpDebounce.cancelMessage) { return }
      reject(err)
      Message.error('服务器异常')
    })
  })
}
