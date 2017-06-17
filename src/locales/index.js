const files = require.context('.', true, /\.js$/)

import eleEN from 'element-ui/lib/locale/lang/en'
import eleZH from 'element-ui/lib/locale/lang/zh-CN'

let customZh = {}
let customEn = {}
let locale = {}

files.keys().forEach((key) => {
  if (key === './index.js') return
  Object.assign(customZh, files(key).default['zh'])
  Object.assign(customEn, files(key).default['en'])
})

function addLang (key, a, b) {
  locale[key] = Object.assign(a, b)
}

addLang('zh', customZh, eleZH)
addLang('en', customEn, eleEN)

export default locale
