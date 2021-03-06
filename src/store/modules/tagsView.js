import Cookies from 'js-cookie'
import { getLanguage } from '../../lang'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? Cookies.get('sidebarStatus') : true,
	withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  size: Cookies.get('size') || 'medium'
}

const mutations = {

}

const actions = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
