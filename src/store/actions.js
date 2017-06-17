import { $apis } from '@helper'
import $types from '@store/types'

export default {
  async getUserInfo ({commit, state}) {
    if (!state.userId) return
    let res = await $apis.getProfile({_id: state.userId})
    commit($types.GET_USERINFO, res.value)
  }
}
