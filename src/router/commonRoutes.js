/*
* 通用路由配置，需要放在配置项数组的末端
*/
import NotFound from '@views/partials/NotFound'
export default [
  {
    path: '/login',
    meta: {
      title: '登录',
      ignoreAuth: true
    },
    component: resolve => require(['@views/Login'], resolve)
  },
  {
    path: '/',
    redirect: '/demo/list'
  },
  {
    path: '*',
    meta: {
      title: '页面未找到',
      ignoreAuth: true
    },
    component: NotFound
  }
]
