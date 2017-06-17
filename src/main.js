import 'babel-polyfill'
import Vue from 'vue'
import './global.js'
import './mixins/globalMixin.js'
import App from './App'
import store from './store/index'
import router from './router'

Vue.config.productionTip = process.env.NODE_ENV !== 'production'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
