export default {
  $vuexSetUserInfo (state, info) {
    state.userId = info._id
    state.isLogin = !!info._id
    state.userInfo = info
  },

  $vuexGetUserInfo (state, info) {
    if (!info || (state.userInfo.username !== info.username)) {
      return
    }

    if (!state.isLogin) {
      return
    }

    state.userInfo = {...info}
  }
}
