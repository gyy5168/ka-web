import { imageBaseUrl } from '@/configs/'
export const isNullOrEmpty = (s) => {
  if (s === null || s === '') {
    return true
  } else {
    return false
  }
}
export const isString = (str) => {
  if (typeof str === 'string') {
    return true
  } else {
    return false
  }
}
// 分页
export const PagingCriteria = (pageIndex, pageSize, sort, mode) => {
  let paging = {}
  paging.limit = pageSize
  paging.offset = (pageIndex - 1) * pageSize
  if (isNullOrEmpty(sort)) {
    paging.orderby = sort
  }
  if (isNullOrEmpty(mode)) {
    paging.direction = mode
  }
  return paging
}

// 拼接URL参数
export const linkSubString = (url, data) => {
  if (url === null || url === '') {
    return url
  }
  let queryString = ''
  if (typeof data === 'object') {
    for (var i in data) {
      queryString += i + '=' + data[i] + '&'
    }
  }
  if (url.indexOf('?') > url.indexOf('/')) {
    url += '&'
  } else {
    url += '?'
  }
  if (queryString !== '') {
    queryString = queryString.substr(0, queryString.length - 1)
  }
  url += queryString
  return url
}

/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 求一个最接近它的整数，它的值小于或等于这个浮点数
 */
export const floorNumber = number => {
  return Math.floor(number) ? Math.floor(number) : 0
}

/**
 * 解析一个字符串，并返回一个浮点数。
 */
export const parseFloatNumber = number => {
  return parseFloat(number) ? parseFloat(number) : 0
}

// 用户头像
export const GetAvatarImageFilter = (imageUrl, width, height) => {
  if (!imageUrl) {
    imageUrl = 'g/img/default_header.png'
  }
  let imgeMogr = ''
    // 百度域名或者没有HTTP和HTPPS的图片拼接后缀
  if ((imageUrl.indexOf(imageBaseUrl) || (imageUrl.indexOf('http://') === -1 && imageUrl.indexOf('https://') === -1)) && width > 0 && height > 0) {
    // 设置分辨率
    imgeMogr = (imageUrl.indexOf('@') > 0 ? '|' : '@')
    imgeMogr += 'w_' + width + ',h_' + height
  }
  if (imageUrl.indexOf('http://wx.qlogo.cn') === 0 || imageUrl.indexOf('https://wx.qlogo.cn') === 0) {
    let temp = imageUrl.split('/')
    temp[temp.length - 1] = '132'
    imageUrl = temp.join('/')
    return imageUrl
  }
  if (imageUrl.indexOf('http://') === 0 || imageUrl.indexOf('https://') === 0) {
    let url = imageUrl + imgeMogr
    url = url.replace('http://', 'https://')
    return url
  } else {
    return imageBaseUrl + imageUrl + imgeMogr
  }
}

export const friendlyDateFilter = (time) => {
  let friendlyDate = ''
  if (time === '' || time === undefined) {
    return friendlyDate
  } else {
    time = time.split('.', 1)[0]
    time = time.replace(new RegExp(/(-)/g), '/')
  }
  let currTimeStr = new Date().Format('yyyy/MM/dd hh:mm:ss') // 当前时间字符串
  let now = new Date(currTimeStr) // 当前时间对象
  let createDate = new Date(time)
  let dayDiff = new Date(time).dateDiff('d', now) // 天数之差
  let minutesDiff = new Date(time).dateDiff('n', now) // 分钟之差
  let hoursDiff = new Date(time).dateDiff('h', now) // 小时之差
  let weeksDiff = new Date(time).dateDiff('w', now) // 星期之差
  if (Math.abs(dayDiff) <= 30) {
    // 上下三十天内
    if (dayDiff === 0) {
      // 当天
      if (minutesDiff === 0) {
        friendlyDate = '现在'
      } else if (Math.abs(minutesDiff) > 60) { // minutesDiff  Math.abs(hoursDiff) >= 1
        // 当天的前后一小时之外
        if (hoursDiff < 0) {
          friendlyDate = Math.abs(hoursDiff) + '小时后'
        } else {
          friendlyDate = Math.abs(hoursDiff) + '小时前'
        }
      } else {
        // 一小时之内
        if (minutesDiff < 0) {
          friendlyDate = Math.abs(minutesDiff) + '分钟后'
        } else {
          friendlyDate = Math.abs(minutesDiff) + '分钟前'
        }
      }
    } else if (dayDiff < 0) {
      // 后三十天内
      if (createDate.getFullYear() === now.getFullYear()) {
        // 同一年
        if (weeksDiff === -1) {
          friendlyDate = '下周' + createDate.getWeekDay()
        } else {
          // n天后
          friendlyDate = Math.abs(dayDiff) + '天后'
        }
      } else {
        // n天后
        friendlyDate = Math.abs(dayDiff) + '天后'
      }
    } else {
      // 前三十天内
      if (createDate.getFullYear() === now.getFullYear()) {
        if (weeksDiff === 1) {
          friendlyDate = '上周' + createDate.getWeekDay()
        } else {
          friendlyDate = Math.abs(dayDiff) + '天前'
        }
      } else {
        friendlyDate = Math.abs(dayDiff) + '天前'
      }
    }
  } else {
    if (createDate.getFullYear() !== now.getFullYear()) {
      friendlyDate = createDate.FormatDateStr()
    } else {
      friendlyDate = createDate.FormatDateStr()
    }
  }
  return friendlyDate
}

export const GetXuanThumbnailFilter = (imageUrl, version) => {
  if (imageUrl.indexOf('http://') === -1 && imageUrl.indexOf('https://')) {
    return '//pic.xuanyes.com/works/defaultcourse.png@!small?version=2'
  }
  imageUrl = imageUrl.replace('http://', 'https://')
  imageUrl = imageUrl.replace('!middle', '!small')
  if (imageUrl.indexOf('?') === -1) {
    if (imageUrl.indexOf('@') === -1) {
      imageUrl = imageUrl + '@!small'
    }
    if (version) {
      imageUrl = imageUrl + '?version=' + version
    }
  }
  return imageUrl
}

export const dateToString = (text, format) => {
  if (isNullOrEmpty(text)) {
    return ''
  }
  if (isString(text)) {
    text = text.replace(/\.\d+/, '').replace(/-/g, '/')
  }
  let date = new Date(text)
  if (isNullOrEmpty(date) || date === 'Invalid Date') {
    return ''
  }
  let dateStr = format
  dateStr = dateStr
    .replace('yyyy', date.getFullYear())
    .replace('MM', (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1))
    .replace('dd', (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()))
    .replace('HH', (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()))
    .replace('mm', (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()))
    .replace('ss', (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()))
  dateStr = dateStr
    .replace('M', date.getMonth() + 1)
    .replace('d', date.getDate())
    .replace('H', date.getHours())
    .replace('m', date.getMinutes())
    .replace('s', date.getSeconds())
  return dateStr
}

// 日期字符串变为日期格式
export const stringToDate = (text) => {
  if (!isNullOrEmpty(text)) {
    text = text.replace(/\.\d+/, '').replace(/-/g, '/')
  }
  return new Date(text)
}

export const getQueryString = (name) => {
  try {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
    r = window.location.hash.substr(window.location.hash.indexOf('?') + 1).match(reg)
    if (r != null) {
      return decodeURIComponent(r[2])
    }
    return null
  } catch (e) {
    alert(JSON.stringify(e))
    return null
  }
}
