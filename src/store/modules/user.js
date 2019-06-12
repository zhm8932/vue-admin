import {login, getInfo} from '../../api/user'
import {getToken, setToken} from '../../utils/auth'

const state = {
  token: getToken(),
  roles: [],
  mame: '',
  introduction: '',
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  login(context, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username, password }).then(response => {
        const {data} = response
        context.commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const {data} = response
        const {avatar, introduction, name, roles} = data
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_INTRODUCTION', introduction)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeRoles({commit, dispatch}, role) {
    return new Promise(async(resolve, reject) => {
      const token = `${role}-token`
      commit('SET_TOKEN', token)
      setToken(token)
      // 获取用户信息，角色等
      const { roles } = await dispatch('getInfo')
      console.log('roles-----------:', roles)
      commit('SET_ROLES', roles)
      const accessedRoutes = await dispatch('permission/generateRoutes', roles, {root: true})
      console.log('accessedRoutes-------------:', accessedRoutes)
      // 获取用户权限路由
      resolve(roles)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
