import request from '../utils/request'

export function getRoles() {
  return request({
    url: '/roles',
    type: 'get'
  })
}

export function deleteRole(id) {
  return request({
    url: `/role/${id}`,
    type: 'delete'
  })
}

export function addRole(data) {
  return request({
    url: `/role`,
    type: 'post',
    data
  })
}

export function updateRole(id) {
  return request({
    url: `/role/${id}`,
    type: 'put'
  })
}
export function getRoutes() {
  return request({
    url: '/routes',
    type: 'get'
  })
}
