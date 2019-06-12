import defaultSettings from '../../settings'
const { showSettings, theme, tagsView, sidebarLogo, fixedHeader } = defaultSettings

const state = {
  theme,
  showSettings,
  tagsView,
  sidebarLogo,
  fixedHeader
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
