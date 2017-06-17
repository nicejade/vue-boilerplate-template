import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'
import {$utils} from '@helper'

Vue.use(Vuex)

const state = {
  isLogin: true,
  userId: $utils.getStorage('NiceLinksUserId') || '',
  userInfo: null
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
