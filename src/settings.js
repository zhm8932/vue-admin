import variables from './styles/element-variables.scss'

export default {
  theme: variables.theme,
  /*
  * @description 是否显示右侧的 settings right-panel
  * */
  showSettings: true,
  /*
  * @description 是否需要tagView
  * */
  tagsView: true,
  /*
  * @description 是否固定header
  * */
  fixedHeader: false,
  /*
  * @description 是否显示logo在sidebar中
  * */
  sidebarLogo: false,
  /*
  * @type {string|array} 'production' | ['production', 'development']
  * @description 显示组件的错误日志
  * */
  errorLog: 'production'
}
