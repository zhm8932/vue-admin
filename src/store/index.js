import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesFiles = require.context('./modules', false, /\.js$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // console.log('modules--:', modules, 'modulePath:', modulePath, modulePath.match(/^\.\/(.*)\.(\w+)$/))
  // set ./app.js => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

import getters from './getters'
// import settings from './modules/settings'

// const modules = {
//   settings
// }
console.log('modules-----:', modules)
export default new Vuex.Store({
  getters,
  modules
})
