import { http } from '@/core/'

/* 账号密码登录 */
export const loginByPhone = (data) => {
  return http.post('zhida/accounts/mobiletokens', data)
}

/* 获取用户信息 */
export const getUserInfo = (userId) => {
  return http.get(`zhida/accounts/${userId}`)
}

// 处理问题听过的数量
export const excQuestionsListenNum = (data) => {
  if (!isNaN(data.listenedCount)) {
    data.listenedCount++
  }
  if (data.length >= 0) {
    for (let d of data) {
      if (!isNaN(d.listenedCount)) {
        d.listenedCount++
      }
    }
  }
}

export const payConfig = (data) => {
  data.configId = 'zhidaService'
  return http.post('zhida/weixin/payrequest', data)
}
