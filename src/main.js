import 'babel-polyfill'
import Vue from 'vue'
import './global.js'
import './mixins/globalMixin.js'
import App from './App'
import store from './store/index'
import router from './router'

/* Configure whether to allow vue-devtools inspection. */
Vue.config.devtools = process.env.NODE_ENV !== 'production'

/* Suppress all Vue logs and warnings. */
Vue.config.silent = process.env.NODE_ENV === 'production'

/* Set this to false to prevent the production tip on Vue startup(2.2.0+). */
Vue.config.productionTip = process.env.NODE_ENV !== 'production'

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
