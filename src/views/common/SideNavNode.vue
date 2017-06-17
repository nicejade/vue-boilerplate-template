<template>
  <el-submenu v-if="isContainMore(model)" :index="model.id">
    <template slot="title">
      <i v-if="model.icon" :class="`el-icon-${model.icon}`"></i>
      {{ model.title[$currentLang] }}
    </template>
    <template v-for="item in model.children">
      <el-menu-item v-if="!isContainMore(item)" :index="item.path" @click="onMenuItemClick(item.path)">
        {{ item.title[$currentLang] }}
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
      default: () => {
        return {}
      }
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
