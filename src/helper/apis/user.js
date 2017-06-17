import $ajax from '../ajax'
import $utils from '../utils'

let serverUrl = $utils.serverUrl

export default {
  login (data) {
    return $ajax.post(serverUrl('login'), data)
  },
  logout () {
    return $ajax.get(serverUrl('logout'))
  }
}
