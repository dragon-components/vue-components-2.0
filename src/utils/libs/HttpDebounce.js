/*
 * @description:http请求防抖处理
 * @Author: xingyixiang
 * @Date: 2019-11-09 10:27:48
 * @LastEditors: xingyixiang
 * @LastEditTime: 2019-11-09 11:55:38
 */

export default class HttpDebounce {
  constructor () {
    this.pendings = []
    this.cancelMessage = 'HTTP_DEBOUNCE_CANCEL'
  }

  setPending ({ url, source }) {
    this.cancelPending(url)
    if (!source) return
    this.pendings.push({
      url,
      source
    })
  }

  removePending (url) {
    this.pendings = this.pendings.filter(item => item.url !== url)
  }

  cancelPending (url) {
    let prePending = this.pendings.find(item => item.url === url)
    if (prePending) {
      prePending.source.cancel(this.cancelMessage)
      this.removePending(url)
    }
  }
}
