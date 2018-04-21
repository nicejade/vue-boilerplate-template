<template>
  <el-submenu v-if="isContainMore(model)" :index="model.fullpath">
    <template slot="title">
      <i v-if="model.icon" :class="`el-icon-${model.icon}`"></i>
      {{ model.meta.title[$currentLang] }}
    </template>
    <template v-for="(item, index) in model.children">
      <el-menu-item v-if="!isContainMore(item)"
        :class="item.fullpath === $route.path ? 'is-active': ''"
        :index="item.path"
        @click="onMenuItemClick(item.path)">
        {{ item.meta.title[$currentLang] }}
      </el-menu-item>
      <side-nav-node :model="item"></side-nav-node>
    </template>
  </el-submenu>
</template>

<script>
export default {
  name: 'side-nav-node',

  props: {
    model: {
      type: Object,
      required: true,
      default: () => {}
    }
  },

  methods: {
    isContainMore (model) {
      return model.children && model.children.length
    },

    onMenuItemClick (item) {
      this.$router.push(item)
    }
  }
}
</script>
