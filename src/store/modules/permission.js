import { asyncRoutes, constantRoutes } from '../../router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
const hasPermission = (route, roles) => {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 获取有权限的菜单
const filterAsyncRoutes = (routes, roles) => {
  const res = []
  routes.forEach(route => {
    const temp = {...route} // 浅拷贝
    if (hasPermission(temp, roles)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles)
      }
      res.push(temp)
    }
  })
  return res
}

const state = {
  routes: constantRoutes
}

const mutations = {
  SET_ROUTES(state, routes) {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes: ({commit}, roles) => {
    return new Promise((resolve, reject) => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      console.log('accessedRoutes----------:', accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
