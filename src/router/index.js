import Vue from 'vue'
import Router from 'vue-router'
// import {context} from '@/core/'
import homeRoute from './home.route'
import login from '@/pages/login'

Vue.use(Router)

const route = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      anonymous: true,
      title: '登录'
    }
  }
]
const router = new Router({
  hashbang: true,
  history: true,
  routes: [...route, ...homeRoute]
})

// route hook
router.beforeEach((to, from, next) => {
  // check 身份
  // if (to.matched.some(record => record.meta.anonymous)) {
  //   // allow access without login
  //   next()
  // } else {
  //   // this route requires auth, check if logged in
  //   // if not, redirect to login page.
  //   if (!context.storage.token) {
  //     next({
  //       path: '/login',
  //       query: { redirect: to.fullPath }
  //     })
  //   } else {
  //     next()
  //   }
  // }
  next()
  // offline状态路由禁止跳转，并提示无网络
})

router.afterEach(route => {
  // set 标题
  document.title = route.meta.title || '咖场-提升你的职场竞争力'
})

export default router
