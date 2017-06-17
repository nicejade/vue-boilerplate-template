import { $utils } from '@helper'
import $types from '@store/types'

export default {
  [$types.RECORD_USERINFO] (state, info) {
    state.userId = info._id
    state.isLogin = true
    state.userInfo = info
    $utils.setStorage($types.STORAGE_USER_ID, info._id)
  },

  [$types.GET_USERINFO] (state, info) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }

    if (!state.isLogin) {
      return
    }

    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  }
}
