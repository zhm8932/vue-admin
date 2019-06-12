import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import NProgress from 'nprogress'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/auth-redirect']
router.beforeEach(async(to, from, next) => {
  NProgress.start()
  // document.title = to.meta.title
  document.title = to.meta.title
  const hasToken = getToken()
  console.log('hasToken----:', hasToken, 'to---:', to, 'from--:', from)
  if (hasToken) {
    if (to.path === '/login') {
      next('/')
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length
      console.log('hasRoles---:', hasRoles, 'store-------------:', store)
      if (hasRoles) {
        console.log('有权限：进入页面-----:', to.path)
        next()
      } else {
        console.log('-------------先获取页面权限-----------------')
        try {
          const { roles } = await store.dispatch('user/getInfo')
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          console.log('roles----------:', roles, 'accessRoutes:', accessRoutes)
          router.addRoutes(accessRoutes)
          console.log('router--------------:', router)
          // console.log('即将跳转的路由：', { ...to, replace: true })
          next({ ...to, replace: true })
        } catch (e) {
          console.log('eeeeeeeeeee-:', e)
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    console.log('无Token的处理')
    // 在白名中的链接，直接跳转
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

