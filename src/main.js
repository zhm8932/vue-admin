import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Element from 'element-ui'

import 'normalize.css/normalize.css'
import './styles/element-variables.scss'
import './styles/index.scss'

import './icons'
import './permission'

import * as filters from './filters'

import i18n from './lang'

import { mockXHR } from '../mock'

if (process.env.NODE_ENV !== 'production') { mockXHR() }

console.log('NODE_ENV:', process.env.NODE_ENV, 'store-----------:', store)
Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value)
})

// 注册全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
