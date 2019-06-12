import request from '../utils/request'

export function getProductsList(query) {
  return request({
    url: '/products/list',
    method: 'get',
    params: query
  })
}
