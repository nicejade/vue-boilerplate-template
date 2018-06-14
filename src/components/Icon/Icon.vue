<template>
  <svg class="icon" :class="iconClass">
    <use :xlink:href="Icons[name]"></use>
  </svg>
</template>

<script>
import Icons from '@assets/icons'

export default {
  name: 'svg-icon',
  props: {
    name: {
      type: String,
      required: true,
      default: '',
      validator (val) {
        return Icons[val]
      }
    }
  },
  data () {
    return {
      Icons: Icons,
      iconClass: `icon-${this.name}`
    }
  }
}
</script>
