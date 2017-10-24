import Frame from '@views/partials/Frame'
import { $utils } from '@helper'

export default [{
  path: '/demo',
  component: Frame,
  name: 'demo',
  // isHideInMenu: true,
  meta: {
    title: $utils.titleLang('示例模块', 'Demo Moudle')
  },
  children: [
    {
      path: 'form',
      name: 'demo_form',
      isHideInMenu: false,
      meta: {
        title: $utils.titleLang('示例表单', 'Demo Form'),
        ignoreAuth: true
      },
      component: resolve => require(['@views/demo/Form'], resolve)
    },
    {
      path: 'list',
      name: 'demo_list',
      meta: {
        title: $utils.titleLang('示例列表', 'Demo  List'),
        ignoreAuth: true
      },
      component: resolve => require(['@views/demo/List'], resolve)
    }
  ]
}]
