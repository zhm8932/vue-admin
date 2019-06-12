const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  permissionRoutes: state => state.permission.routes,
  sidebar: state => state.sidebar
}
export default getters
