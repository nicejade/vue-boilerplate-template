<template>
  <div class="page-frame">
    <header-component></header-component>
    <div class="frame-content">
      <side-nav></side-nav>
      <main @click="onHideMenuClick">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import SideNav from '@views/partials/SideNav'
import HeaderComponent from '@views/partials/Header'
import RoutesMapConfig from '@router/routes'

export default{
  name: 'Frame',

  props: {
  },

  data () {
    return {
    }
  },

  created () {
    /*
      Desc: 请求用户信息;当然，如果你在登录时候返回，可删除此行。
    */
    this.$getUserInfo()

    this.initMenuList()
  },

  components: {
    SideNav,
    HeaderComponent
  },

  methods: {
    initMenuList () {
      /*
        Desc:
          初始化侧边栏；当然，侧边栏配置一般由前后端共同作用;
          如果你的需求也是如此，那么，在 vuex 的 action 发起请求，是一个不错的选择；
          为了避免每次刷新界面都发起请求，应将 menuList 持久化存储（localStorage）
          鉴于没个项目有所区别，这部分实现，在现有代码中已省略，相信您会处理的更好。
        Date: update@2017-10-20
      */
      let menuList = RoutesMapConfig.slice()
      menuList.forEach(item => {
        item.component && delete item.component
        if (!this.$_.isEmpty(item.children)) {
          menuList.forEach(cItem => {
            cItem.component && delete cItem.component
          })
        }
      })
      this.$setMenuList(menuList)
    },

    onHideMenuClick () {
      document.getElementById('app').className = ''
    }
  }
}
</script>

<style lang="scss">
.page-frame {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .frame-content {
    flex: 1;
    display: flex;
  }
  main {
    flex: 1;
  }
}
</style>
