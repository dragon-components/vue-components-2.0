
/**
 * @Author: dragon
 * @Date: 2019-08-31 12:16:22
 * @Desc: 工具类
 */
import { isObject } from './validate.js'

// 补零
const zerofill = (number) => {
  return number < 10 ? `0${number}` : number
}
// 某个日期（时间戳-毫秒）格式化; formater: 'YY-MM-DD hh:mm:ss'
const dateFormate = (ms, formater) => {
  if (!ms) return ''
  formater = formater || 'YY-MM-DD hh:mm:ss'
  const time = new Date(ms)
  const year = time.getFullYear()
  const month = zerofill(time.getMonth() + 1)
  const day = zerofill(time.getDate())
  const hour = zerofill(time.getHours())
  const minute = zerofill(time.getMinutes())
  const second = zerofill(time.getSeconds())
  return formater.replace('YY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hour)
    .replace('mm', minute)
    .replace('ss', second)
}
// 倒计时（时间戳-毫秒）
const countDown = (ms, formater) => {
  formater = formater || 'hh:mm:ss'
  let [hour, minute, second] = ['00', '00', '00']
  if (ms > 0) {
    const secondnum = parseInt(ms / 1000, 0)
    const day = Math.floor(secondnum / 86400)
    hour = zerofill(Math.floor((secondnum - day * 86400) / 3600))
    minute = zerofill(Math.floor((secondnum - day * 86400 - hour * 3600) / 60))
    second = zerofill(Math.floor(secondnum - day * 86400 - hour * 3600 - minute * 60))
  }
  return formater.replace('hh', hour)
    .replace('mm', minute)
    .replace('ss', second)
}
/**
 * [对queryObj的逆向操作。将query对象变成search字符串]
 * @param  {Object} obj [处理的目标对象]
 * @return {String}     [search字符串]
 */
const objToQuery = (obj) => {
  if (!isObject(obj)) {
    return ''
  }
  let arr = []
  Object.keys(obj).forEach((item, index, array) => {
    arr.push(`${item}=${obj[item]}`)
  })
  return arr.join('&')
}
/**
 * [数字转金额大写]
 * @param  {Number} number [数字]
 * @return {String} [金额大写字符串]
 */
const numberToChinese = (number) => {
  if (number && number > 0) {
    if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(number)) {
      return '数据非法'
    }
    let unit = '千百拾亿千百拾万千百拾元角分'
    let str = ''
    number += '00'
    let p = number.indexOf('.')
    if (p >= 0) {
      number = number.substring(0, p) + number.substr(p + 1, 2)
    }
    unit = unit.substr(unit.length - number.length)
    for (var i = 0; i < number.length; i++) {
      str += '零一二三四五六七八九'.charAt(number.charAt(i)) + unit.charAt(i)
    }
    return str.replace(/零(千|百|拾|角)/g, '零')
      .replace(/(零)+/g, '零')
      .replace(/零(万|亿|元)/g, '$1')
      .replace(/(亿)万|一(十)/g, '$1$2')
      .replace(/^元零?|零分/g, '')
      .replace(/元$/g, '')
  }
}
/**
 * [控制文本长度]
 * @param  {Number} number [数字]
 * @return {String} [金额大写字符串]
 */
const cutText = (value, wordwise, max, tail) => {
  if (!value) return ''
  max = parseInt(max, 10)
  if (!max) return value
  if (value.length <= max) return value
  value = value.substr(0, max)
  if (wordwise) {
    var lastspace = value.lastIndexOf(' ')
    if (lastspace !== -1) {
      value = value.substr(0, lastspace)
    }
  }
  return value + (tail || ' …')
}
// 负数货币过滤器解决办法
const customCurrency = (amount) => {
  let value
  if (!amount == null || amount === 'null') {
    value = ''
    return ''
  } else {
    value = parseFloat(amount).toFixed(2)
    return `¥ ${value}`
  }
}

// 统一货币过滤器
const currency = (amount, currencySymbol) => {
  if (!amount || isNaN(Number(amount))) return currencySymbol ? currencySymbol + '0.00' : '0.00'

  let intPart = parseInt(amount)
  let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  let negative0Flag = false
  if (+intPart.toString() === 0) { // 处理 0 -0
    negative0Flag = negative0(intPart)
  }
  intPartFormat = negative0Flag ? '-' + intPartFormat : intPartFormat
  // 判断是否是“-0”
  function negative0 (num) {
    return +num === 0 && 1 / num < 0
  }
  let floatPart = '.00'
  let value2Array = (amount + '').split('.')

  if (value2Array.length === 2) {
    floatPart = value2Array[1].toString()
    if (floatPart.length === 1) {
      return currencySymbol ? currencySymbol + intPartFormat + '.' + floatPart + '0' : intPartFormat + '.' + floatPart + '0'
    } else if (floatPart.length > 2) {
      let sFloat = (parseFloat('0.' + floatPart).toFixed(2)).split('.')[1]
      return currencySymbol ? currencySymbol + intPartFormat + '.' + sFloat : intPartFormat + '.' + sFloat
    } else {
      return currencySymbol ? currencySymbol + intPartFormat + '.' + floatPart : intPartFormat + '.' + floatPart
    }
  } else {
    return currencySymbol ? currencySymbol + intPartFormat + floatPart : intPartFormat + floatPart
  }
}

const jsonParse = (obj) => {
  if (!obj) {
    return ''
  }
  return JSON.parse(obj)[0] + '?imageView2/1/w/110/h/90'
}

const imageTrim = (obj) => {
  if (!obj) {
    return ''
  }
  return obj + '?imageView2/2/w/150/h/120'
}
// 从时间字符串中返回年月日，如'2016年3月21日 14时30分28秒'返回'2016年3月21日'
const yearMonthDay = (input) => {
  input = input || ''
  input = input.trim()
  return input.match(/(^[^\s]+)\s/) && input.match(/(^[^\s]+)\s/)[1]
}
// 从对象数组中删除重复的对象，id为对象属性名，如果有两个对象的该属性值相等，则认为重复，后一个会被删除
const noRepeat = (input, id) => {
  input = input.filter(function (e, i, arr) {
    var test = arr.slice(0, i).every(function (el) {
      return (el[id] !== e[id])
    })
    if (test) {
      return e
    }
  })
  return input
}

// 保留两位小数
const number2 = (number) => {
  if (!number) {
    return 0
  }
  return number.toFixed(2)
}
// 保留整数
const number0 = (number) => {
  if (!number) {
    return 0
  }
  return number.toFixed(0)
}
// 精确到百位（不做四舍五入）
const number100 = (number) => {
  if (!number) {
    return 0
  }
  return Math.floor(number / 100) * 100
}

/**
 * [手机号码校验]
 * @param  {[Number/"Number"]} phoneNum [手机号码]
 * @return {[Boolean]}     [符合规则返回ture，否在false]
 */
const phoneTest = (phoneNum) => {
  let reg = /^[1]\d{10}$|^([5|6|9])\d{7}$|^[9]\d{8}$|^[6]\d{7}$/
  return reg.test(phoneNum)
}

/**
 * [校验手机号码和固话]
 */
const mobile = (mobileNum) => {
  let reg = /^[1]\d{10}$|^([5|6|9])\d{7}$|^[9]\d{8}$|^[6]\d{7}$/
  let reg1 = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/
  return reg.test(mobileNum) || reg1.test(mobileNum)
}

const formatArr = function (key, val, arr) {
  arr.length && arr.map(function (_item) {
    _item.label = _item[key]
    _item.value = _item[val]
    _item.multiple = true
  })
  return arr
}

export default {
  dateFormate,
  countDown,
  objToQuery,
  numberToChinese,
  cutText,
  customCurrency,
  currency,
  jsonParse,
  imageTrim,
  yearMonthDay,
  noRepeat,
  number2,
  number0,
  number100,
  phoneTest,
  mobile,
  formatArr
}
