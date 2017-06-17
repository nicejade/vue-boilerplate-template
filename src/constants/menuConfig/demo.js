import { $utils } from '@helper'

export default {
  title: $utils.titleLang('示例模块', 'Demo Moudle'),
  id: 'demo',
  icon: 'ADM_Manage',
  children: [{
    title: $utils.titleLang('示例表单', 'Demo Form'),
    path: '/demo/form'
  }, {
    title: $utils.titleLang('示例列表', 'Demo  List'),
    path: '/demo/list'
  }]
}
