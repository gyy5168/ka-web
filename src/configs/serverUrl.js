const apiBaseUrl = (process.env.NODE_ENV === 'production')
  ? {
    'main': 'https://api-zhida.yxt.com/v1/',
    'common': 'https://api-component.yxt.com/v1/',
    'log': 'https://log-common.yxt.com/logapi/v1/'
  }
  : {
    'main': 'https://devinner.yunxuetang.com.cn/zhidaapi/v1/',
    'common': 'https://api.yunxuetang.com.cn/componentapi/v1/',
    'log': 'https://devinner.yunxuetang.com.cn/logapi/v1/'
  }

const imageBaseUrl = process.env.NODE_ENV === 'production'
  ? '//zhidao.yxt.com/'
  : '//zhidao-test.yxt.com/'

const wxUrl = process.env.NODE_ENV === 'production'
  ? 'https://apixkt.yunxuetang.com/'
  : 'https://apixkt.yunxuetang.com.cn/'

export {apiBaseUrl, imageBaseUrl, wxUrl}
