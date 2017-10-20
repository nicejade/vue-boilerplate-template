// import {STORAGE_KEY} from '@constants/index'
// import { $utils } from '@helper'

export default {
  $vuexSetUserInfo (state, info) {
    state.userId = info._id
    state.userInfo = info
  },

  $vuexSetMenuList (state, menuList) {
    /**
      Desc: 如果需要持久化存储信息，可借助 localStorage, $utils 中已封装了该方法;
      Date: @udpate@2017-10-20
    **/
    // $utils.setStorage(STORAGE_KEY, menuList)
    state.menuList = menuList
  }
}
