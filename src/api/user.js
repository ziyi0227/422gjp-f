import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/family/login',
    method: 'post',
    data
  })
}
export function register(data) {
  return request({
    url: '/family/register',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/family/info',
    method: 'get',
    params: { token }
  })
}
export function getUserInfo() {
  return request({
    url: '/family/Info',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/family/logout',
    method: 'post'
  })
}