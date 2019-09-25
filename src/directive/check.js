const regMap = {
  name: /[\u4e00-\u9fa5A-Za-z]{0,9}(\.?[\u4e00-\u9fa5A-Za-z]*)/g,
  // 手机号码
  mobile: /(^[1-9]\d{0,10})/g,
  // 密码
  password: /\W/,
  // 金额、保留两位小数
  money: /^\d*(\.?\d{0,2})/g,
  // 整数
  int: /[^\d]/g,
  // 只能是字母
  letter: /[^a-zA-Z]/
}

export default {
  bind(el, binding) {
    console.log('check绑定成功')
  },
  // 被绑定元素插入父节点时调用
  inserted(el, binding, vdom) {
    const dom = el.children && el.children.length ? el.children[0] : el
    const {type, val, success} = binding.value
    console.log('type--:', type, 'val--:', val)
    dom.addEventListener('input', function(e) {
      e = e || window.event
      const val = e.target.value
      console.log('val-------:', val)
      let value
      switch (type) {
        case 'name': // 姓名
          value = val.match(regMap[type])
          console.log('valuevalue--:', value)
          value = value ? value[0] : null
          // value = val
          break
        case 'money':
        case 'mobile':
          value = val.match(regMap[type])
          value = value ? value[0] : null
          console.log('valuevaluevalue-:', value)
          break
        case 'password':
          value = val.replace(regMap[type], '') // 只能是字母、数字和下划线，长度不限制
          // 密码不超过16位
          value = value.substr(0, 16)
          break
        case 'int':
        case 'letter':
          value = val.replace(regMap[type], '')
          break
        case 'bankcard':
          /* // 当前光标的位置
          const cursorIndex = e.target.selectionStart
          // 字符串中光标前空格的格式
          const lineNumOfCursorLeft = (val.slice(0, cursorIndex).match(/\d/g) || []).length
          const newCardNum = val.replace(/\s/g, '').replace(/\D+/g, '').replace(/(\d{4})/g, '$& ').replace(/\s$/, '')
          console.log('cursorIndex--:', cursorIndex, 'newCardNum:', newCardNum)
          // 改后字符串中原光标之前-的个数
          const newLineNumOfCursorLeft = (newCardNum.slice(0, cursorIndex).match(/-/g) || []).length
          // 光标在改后字符串中应在的位置
          const newCursorIndex = cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft
          console.log('newCursorIndex-:', newCursorIndex, cursorIndex, newLineNumOfCursorLeft, lineNumOfCursorLeft)
          */
          value = val.replace(/\D/g, '').replace(/....(?!$)/g, '$& ')
          value = value.substr(0, 19 + (value.match(/\s/g) || []).length)
          // e.target.selectionStart = newCursorIndex
          // e.target.selectionEnd = newCursorIndex
          break
      }
      e.target.value = value
      console.log('value-:', value)
      success && success(value)
    })
  },
  update(el, binding) {
    /* const dom = el.children && el.children.length ? el.children[0] : el
    let value
    console.log('更新:', binding, dom.target, dom.target)
    // 进行判断、避免同时触发多个判断
    if (binding.oldValue.val !== binding.value.val) {
      const {type, val, success} = binding.value
      console.log('type--:', type, 'val--:', val)
      let checkStatus = true // 定义局部变量
      switch (type) {
        case 'mobile':
          if (!/^1[34578]\d{9}$/.test(val)) {
            checkStatus = false
          }
          value = val.match(/(^[1-9]\d{0,10})/g)
          value = value ? value[0] : null
          console.log('value---:', value, dom.target, el.target)
          dom.value = value
          // binding.value.val = value
          break
      }
      if (checkStatus) {
        dom.style.border = '1px solid #ddd'
      } else {
        dom.style.border = '1px solid #ff0000'
      }
      success && success(checkStatus, val)
    }*/
  }
}
