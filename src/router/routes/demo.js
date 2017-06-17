import Frame from '@views/Frame'
import { $utils } from '@helper'

export default [{
  path: '/',
  component: Frame,
  children: [
    {
      path: 'demo/form',
      meta: {
        title: $utils.titleLang('示例表单', 'Demo Form'),
        ignoreAuth: true
      },
      component: resolve => require(['../../views/demo/Form'], resolve)
    },
    {
      path: 'demo/list',
      meta: {
        title: $utils.titleLang('示例列表', 'Demo  List'),
        ignoreAuth: true
      },
      component: resolve => require(['../../views/demo/List'], resolve)
    }
  ]
}]
