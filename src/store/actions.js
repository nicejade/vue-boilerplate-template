import { $apis } from '@helper'

export default {
  async getUserInfo ({commit, state}) {
    if (!state.userId) return
    let res = await $apis.getProfile({_id: state.userId})
    commit('$vuexGetUserInfo', res.value)
  }
}
