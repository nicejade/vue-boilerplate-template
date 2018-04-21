<template>
  <div class="sidenav">
    <el-menu router unique-opened
      :default-openeds="defaultOpeneds">
      <template v-for="(item, index) in menuList">
        <side-nav-node :model="item"></side-nav-node>
      </template>
    </el-menu>
  </div>
</template>

<script>
import SideNavNode from './SideNavNode'

export default {
  name: 'side-nav',

  data () {
    return {
      defaultOpeneds: ['demo']
    }
  },

  components: {
    SideNavNode
  },

  computed: {
    menuList () {
      return this.$store.state.menuList
    }
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
  background-color: #eef1f6;
  a {
    display: block;
    color: $black;
    padding: 10px 10px 10px 20px;
    &:hover,
    &:focus {
      text-decoration: none;
      color: $brand;
    }
  }
  .active {
    text-decoration: none;
    color: $brand;
  }
  .title {
    padding: 15px;
    font-size: $font-large;
    position: relative;
  }
}
</style>
