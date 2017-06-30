import Vue from 'vue'
import { TABNAMES } from './consts'
import * as context from './context'
import { isNullOrEmpty, PagingCriteria, getQueryString } from './utils'

import {
  http,
  loghttp,
  commonhttp,
  setAuth
} from './apiInstances'

const startup = () => {
  context.setStorageContext(localStorage)
  Vue.prototype.context = context
  Vue.prototype.isNullOrEmpty = isNullOrEmpty
  Vue.prototype.PagingCriteria = PagingCriteria
  Vue.prototype.getQueryString = getQueryString
    // 1. try load localStorage的身份
    // 2. try load weixin身份（如果是微信打开）
    // 3. try load yunxuetang app shell 的身份
}

/* eslint-disable no-extend-native */
/* eslint-disable no-eval */
// 当前日期格式化
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 将日期格式化成yyyy年MM月dd日
Date.prototype.FormatDateStr = function () {
  var date = this
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '年' + m + '月' + d + '日'
}

// 日期相加
Date.prototype.dateAdd = function (interval, number) {
  // interval必选项
  // y-年
  // q-季度
  // m-月
  // d-日
  // w-周
  // h-小时
  // n-分钟
  // s-秒
  // ms-毫秒
  var d = this
  var k = {
    'y': 'FullYear',
    'q': 'Month',
    'm': 'Month',
    'w': 'Date',
    'd': 'Date',
    'h': 'Hours',
    'n': 'Minutes',
    's': 'Seconds',
    'ms': 'MilliSeconds'
  }
  var n = { 'q': 3, 'w': 7 }
  eval('d.set' + k[interval] + '(d.get' + k[interval] + '()+' + ((n[interval] || 1) * number) + ')')
  return d
}

// 日期相减
Date.prototype.dateDiff = function (interval, objDate2) {
  // interval必选项
  // y-年
  // q-季度
  // m-月
  // d-日
  // w-周
  // h-小时
  // n-分钟
  // s-秒
  // ms-毫秒
  let d = this
  let i = {}
  let t = d.getTime()
  let t2 = objDate2.getTime()
  i['y'] = objDate2.getFullYear() - d.getFullYear()
  i['q'] = i['y'] * 4 + Math.floor(objDate2.getMonth() / 4) - Math.floor(d.getMonth() / 4)
  i['m'] = i['y'] * 12 + objDate2.getMonth() - d.getMonth()
  i['ms'] = objDate2.getTime() - d.getTime()
  i['w'] = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t + 345600000) / (604800000))
  i['d'] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000)
  i['h'] = parseInt(t2 / 3600000 - t / 3600000)
  i['n'] = Math.floor(t2 / 60000) - Math.floor(t / 60000)
  i['s'] = Math.floor(t2 / 1000) - Math.floor(t / 1000)
  return i[interval]
}

// 返回星期数
Date.prototype.getWeekDay = function () {
  let day = this.getDay()
  let weekDay = ''

  switch (day) {
    case 0:
      weekDay = '日'
      break
    case 1:
      weekDay = '一'
      break
    case 2:
      weekDay = '二'
      break
    case 3:
      weekDay = '三'
      break
    case 4:
      weekDay = '四'
      break
    case 5:
      weekDay = '五'
      break
    case 6:
      weekDay = '六'
      break
  }
  return weekDay
}

export { TABNAMES, context, http, loghttp, commonhttp, setAuth, startup }
