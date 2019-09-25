import focus from './focus'

const install = function(Vue) {
  Vue.directive('focus', focus)
}

if (window.Vue) {
  console.log('自动注册')
  window.focus = focus
  Vue.use(install); // eslint-disable-line
}
focus.install = install

export default focus
