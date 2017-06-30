import Vue from 'vue'
import {apiBaseUrl, wxUrl, imageBaseUrl} from './serverUrl'

const debug = !(process.env.NODE_ENV === 'production')
window.$debug = Vue.prototype.$debug = debug

export {apiBaseUrl, wxUrl, imageBaseUrl, debug}
