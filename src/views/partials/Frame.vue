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
    this.initMenuList()
  },

  components: {
    SideNav,
    HeaderComponent
  },

  methods: {
    initMenuList () {
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
