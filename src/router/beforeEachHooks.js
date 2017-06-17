/*
* 路由跳转权限控制
*/
import { $auth } from '@helper'

export default {
  // 检查登录态
  checkLoginAuth (to, from, next) {
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      if ($auth.checkSession()) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  },
  // 检查页面权限
  checkPageAuth (to, from, next) {
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      // check user auth here....
      next()
    }
  }
}
