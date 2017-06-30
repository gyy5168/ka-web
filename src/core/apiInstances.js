import Vue from 'vue'
import axios from 'axios'
import {apiBaseUrl} from '@/configs/'
import router from '@/router'
import {storage} from './context'

const http = axios.create({
  'baseURL': apiBaseUrl.main,
  'headers': {
    'Content-Type': 'application/json;charset=UTF-8',
    'source': '306'
  },
  validateStatus: (status) => {
    return status < 600
  }
})

const loghttp = axios.create({
  'baseURL': apiBaseUrl.log,
  'headers': {
    'Content-Type': 'application/json;charset=UTF-8',
    'source': '306'
  },
  validateStatus: (status) => {
    return status < 600
  }
})

const commonhttp = axios.create({
  'baseURL': apiBaseUrl.common,
  'headers': {
    'Content-Type': 'application/json;charset=UTF-8',
    'source': '306'
  },
  validateStatus: (status) => {
    return status < 600
  }
})

const req = {
  'resolve': config => {
    if (storage.token) {
      config.headers.token = storage.token
    }
    return config
  },
  'reject': (error) => {
    return Promise.reject('req', error)
  }
}

const res = {
  'resolve': function (response) {
    // response.request.responseURL
    if (response.status === 401) {
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      })
    }
    return response.data
  },
  'reject': function (error) {
    if (error.response.status === 401) {
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      })
    }
    return Promise.reject(error)
  }
}

// Add a request interceptor
http.interceptors.request.use(req.resolve, req.reject)
loghttp.interceptors.request.use(req.resolve, req.reject)
commonhttp.interceptors.request.use(req.resolve, req.reject)
// Add a response interceptor
http.interceptors.response.use(res.resolve, res.reject)
loghttp.interceptors.response.use(res.resolve, res.reject)
commonhttp.interceptors.response.use(res.resolve, res.reject)

Vue.prototype.$http = http
Vue.prototype.$loghttp = loghttp
Vue.prototype.$commonhttp = commonhttp

let setAuth = function (token, clientKey) {
  http.defaults.headers.common['token'] = token
  // http.headers.common['clientKey'] = clientKey

  // loghttp.headers.common['token'] = token
  // loghttp.headers.common['clientKey'] = clientKey

  // commonhttp.headers.common['token'] = token
  // commonhttp.headers.common['clientKey'] = clientKey
}

export {http, loghttp, commonhttp, setAuth}
