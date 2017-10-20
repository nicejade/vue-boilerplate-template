<template>
  <div class="sidenav">
    <el-menu router unique-opened theme="dark"
      :default-openeds="defaultOpeneds" >
      <template v-for="(item, index) in sideNav">
        <side-nav-node :model="item"></side-nav-node>
      </template>
    </el-menu>
  </div>
</template>

<script>
import SideNavNode from './SideNavNode'
import MenuConfig from '@constants/menuConfig'

export default {
  name: 'side-nav',

  data () {
    return {
      sideNav: MenuConfig,
      defaultOpeneds: ['demo']
    }
  },

  components: {
    SideNavNode
  }
}
</script>

<style lang="scss">
@import "./../../assets/scss/variables.scss";
@import "./../../assets/scss/mixins.scss";

.sidenav{
  position: fixed;
  left: 0;
  height: 100%;
  min-height: 100%;
  left: 0;
  top: $header-height;
  z-index: 8;
  width: $sidenav-width;
  min-width: 200px;
  background-color: #48576a;
  a {
    display: block;
    color: $black;
    padding: 10px 10px 10px 20px;
    &:hover,
    &:focus {
      text-decoration: none;
      color: $blue;
    }
  }
  .active {
    text-decoration: none;
    color: $blue;
  }
  .title {
    padding: 15px;
    font-size: $font-large;
    position: relative;
  }
}
</style>
