import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Filters from './filters'
import ElementUI from 'element-ui'
import Cookies from 'js-cookie'
import locales from './locales'
import 'element-ui/lib/theme-default/index.css'
import Icon from '@components/Icon/index.js'
import { $apis, $utils, $document, $auth } from '@helper'
import $types from '@store/types'

Vue.use(VueI18n)
Vue.use(ElementUI)

/* inject i18n */
const browserLanguage = (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
const lang = Cookies.get('lang') || (browserLanguage in locales ? browserLanguage : 'en')
Vue.config.lang = lang

Object.keys(locales).forEach(lang => {
  Vue.locale(lang, locales[lang])
})

for (let key in Filters) {
  Vue.filter(key, Filters[key])
}

Vue.component('icon', Icon)

Vue.prototype.$apis = $apis
Vue.prototype.$utils = $utils
Vue.prototype.$auth = $auth
Vue.prototype.$document = $document
Vue.prototype.$types = $types
