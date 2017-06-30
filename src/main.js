// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { startup } from '@/core/'
import filter from '@/core/filters'

import '@/assets/scss/kachang-web.scss'

Vue.use(filter)

Vue.config.productionTip = false

startup()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
