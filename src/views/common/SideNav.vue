<template>
  <div class="sidenav">
    <el-menu router unique-opened theme="dark" :default-openeds="defaultOpeneds" >
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
