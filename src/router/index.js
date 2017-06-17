import Vue from 'vue'
import _ from 'lodash'
import Router from 'vue-router'
import beforeEachHooks from './beforeEachHooks'
import RoutesMapConfig from './routes'
import commonRoutesMap from './commonRoutes'

Vue.use(Router)

const routerInstance = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: RoutesMapConfig.concat(commonRoutesMap)
})

_.values(beforeEachHooks).forEach((hook) => {
  routerInstance.beforeEach(hook)
})

export default routerInstance
