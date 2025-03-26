import request from '@/utils/request'

export function getStatisticalData(params) {
  return request({
    url: '/vue-admin-template/home/list',
    method: 'get',
    params
  })
}
