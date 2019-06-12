import store from '../../store'

export default {
  // bind 只调用一次，指令第一次绑定到元素时调用，在这里可以进行一次性的初始化设置
  bind() {
    console.log('-------------进入自定义指令-----------------')
    console.log('bind----开始')
  },
  // inserted 被绑定元素插入父节点时调用（仅保证父节点存在，但不一定已被插入文档中）
  inserted(el, binding, vnode) {
    const roles = store.getters.roles
    console.log('el---:', el, 'roles:', roles)
    console.log('binding---:', binding)
    console.log('vnode---:', vnode)
    const { value } = binding
    if (value && value instanceof Array && value.length) {
      const permissionRoles = value
      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })
      if (!hasPermission) {
        console.log('没有权限:', el)
        el.parentNode && el.parentNode.removeChild(el)
      } else {
        console.log('有权限:', el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  },
  // update 所在组件的 VNode 更新时调用
  update() {
    console.log('update----开始')
  },
  // 只调用一次，指令与元素解绑时调用
  unbind() {
    console.log('unbind----')
  }
}
