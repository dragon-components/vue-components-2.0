import axios from 'axios'
import { getToken } from './util'
import { znDot } from '@/utils/dot'
import { Message, Modal } from 'iview'
import HttpDebounce from './HttpDebounce'

const CancelToken = axios.CancelToken
export const httpDebounce = new HttpDebounce()
const DEFAULT_IS_DEBOUNCE = true // 是否要开启默认防抖

// import { Spin } from 'iview' getNextRoute
// const addErrorLog = errorInfo => {
//   const { statusText, status, request: { responseURL } } = errorInfo
//   let info = {
//     type: 'ajax',
//     code: status,
//     mes: statusText,
//     url: responseURL
//   }
//   if (!responseURL.includes('save_error_logger')) store.dispatch('addErrorLog', info)
// }
class HttpRequest {
  constructor (publicPath) {
    this.publicPath = publicPath || ''
    this.queue = {}
  }
  getInsideConfig ({ headers = {}, ...options }) {
    let defaultHeaders = {
      'X-Auth-Token': getToken()
    }
    Object.assign(defaultHeaders, options.headers)
    const config = {
      baseURL: this.publicPath,
      headers: defaultHeaders,
      ...options
    }
    return config
  }
  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, { url }, source) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      httpDebounce.setPending({ url, source })

      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启， 因为界面不友好
      }
      this.queue[url] = true
      // 埋点接口上报
      if (config.url !== '/zms/api-msc/api/v1/pipeline/passFlag/collectLog') {
        znDot().event._net_req({
          url: config.url,
          method: config.method,
          param: config.params
        })
      }
      return config
    }, error => {
      znDot().event._errors({
        error_desc: error
      })
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      httpDebounce.removePending(url)
      this.destroy(url)
      const { data, status } = res
      // 鉴权失效
      switch (+res.data.errCode) {
        case 10001:
          Modal.confirm({
            title: '提示',
            content: '<p>登录过期，请重新登录！',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
              localStorage.removeItem('token')
              localStorage.removeItem('user_id')
              localStorage.removeItem('userInfo')
              localStorage.removeItem('user_name')
              localStorage.removeItem('menus')
              localStorage.removeItem('elements')
              location.reload()
              // 登出接口
              this.$router.push({
                name: 'login'
              })
            }
          })
          break
        case 10002:
          Modal.confirm({
            title: '提示',
            content: '<p>抱歉！您没有权限访问，请联系管理员！',
            okText: '确定',
            cancelText: '取消'
          })
          break
        case 20004:
          Modal.confirm({
            title: '提示',
            content: '<p>用户不存在，请联系管理员！',
            okText: '确定',
            cancelText: '取消'
          })
          break
        case 9999999:
          Message.error(`${+res.data.errCode} : ${res.data.message}`)
          break
        default:
          // 埋点接口返回
          if (res.config.url !== '/zms/api-msc/api/v1/pipeline/passFlag/collectLog' && res.status === 200) {
            if (res.data && res.data.errCode !== 0) {
              znDot().event._net_bus_err({
                url: res.config.url,
                method: res.config.method,
                param: {
                  ...res.config.params,
                  ...res.data
                }
              })
            } else {
              znDot().event._net_req({
                url: res.config.url,
                method: res.config.method,
                param: res.config.params
              })
            }
          }
          break
      }
      return { data, status }
    }, error => {
      httpDebounce.removePending(url)
      if (error.message === httpDebounce.cancelMessage) { // http 防抖
        console.log(`%c ${httpDebounce.cancelMessage}`, 'color:#0f0;')
        return Promise.reject(httpDebounce.cancelMessage)
      }
      // addErrorLog(error.response)
      znDot().event._net_http_err({
        url: error.response.config.url,
        method: error.response.config.method,
        param: {
          ...error.response.config.params,
          message: error.message
        }
      })
      this.destroy(url)
      return Promise.reject(error)
    })
  }
  request ({
    url,
    params = {},
    method = 'post',
    isDebounce = DEFAULT_IS_DEBOUNCE,
    ...otheroOption
  }) {
    const dataMethods = ['put', 'post', 'patch']
    const paramsMethods = ['get', 'delete', 'head']
    let options = { url, method }
    if (dataMethods.indexOf(method) > -1) {
      options.data = params
    }
    if (paramsMethods.indexOf(method) > -1) {
      options.params = params
    }
    let source = null
    if (isDebounce) {
      source = CancelToken.source()
      options.cancelToken = source.token
    }
    Object.assign(options, otheroOption)
    const instance = axios.create()
    options = this.getInsideConfig(options)
    this.interceptors(instance, options, source)
    return instance(options)
  }
}
export default HttpRequest
