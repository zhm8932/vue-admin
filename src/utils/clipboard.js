import Clipboard from 'clipboard'
import Vue from 'vue'
function clipboardSuccess() {
  console.log('Vue.prototype--:', Vue.prototype)
  // Vue.prototype.$alert('复制成功')
  Vue.prototype.$message({
    message: '复制成功',
    type: 'success'
  })
}
function clipboardError() {
  Vue.prototype.$message({
    message: '复制失败',
    type: 'error'
  })
}
export default function handleClipboard(event, text) {
  console.log('target-----:', event.target)
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })

  clipboard.on('success', () => {
    console.log('success')
    clipboardSuccess()
    clipboard.off('success')
    clipboard.off('error')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    console.log('error')
    clipboardError()
    clipboard.off('success')
    clipboard.off('error')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
