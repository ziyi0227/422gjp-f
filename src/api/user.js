import request from '@/utils/request'

export function getUserType() {
  return request({
    url: '/user/getUserType',
    method: 'post'
  })
}
