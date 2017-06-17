/*
* 注册全局组件，全局组件以配置文件的形式写到globals.json中
*/

import Vue from 'vue'
import globalComponentsConfig from './globals.json'

export default {
  register () {
    globalComponentsConfig.forEach((item) => {
      Vue.component(item.tag, require(`../../components/${item.dir}/index.js`))
    })
  }
}
