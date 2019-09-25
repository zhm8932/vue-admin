
export default {
  // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置
  bind(el, binding) {
    console.log('指定绑定成功:', el, el.children)
    /* const dom = el.children && el.children.length ? el.children[0] : el
    // 聚焦元素
    dom.focus()
    dom.style.color = '#ff0000'*/
  },
  // 被绑定元素插入父节点时调用
  inserted(el) {
    console.log('inserted-------')
    const dom = el.children && el.children.length ? el.children[0] : el
    // 聚焦元素
    dom.focus()
    dom.style.color = '#ff0000'
  },
  // 所在组件的 VNode 更新时调用
  update(el, binding, vnode) {
    console.log('update---------')
    const dom = el.children && el.children.length ? el.children[0] : el
    // el.style.display = binding.value ? 'block' : 'none'
    dom.style.color = '#fff000'
  },
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated(el, binding, vnode) {
    console.log('componentUpdated--------')
  },
  unbind(el, binding, vnode) {
    console.log('unbind----------')
  }
}
