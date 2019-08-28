import request from '../utils/request'

export function getChartData() {
  return request({
    url: '/home/chartData',
    method: 'get'
  })
}
