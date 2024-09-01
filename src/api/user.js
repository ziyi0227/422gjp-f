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
export function getFamilyInfo() {
  return request({
    url: '/family/getInfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/family/logout',
    method: 'post'
  })
}
export function updateInfo() {
  return request({
    url: '/family/updateInfo',
    method: 'post'
  })
}
export function deleteUser() {
  return request({
    url: '/family/deleteUser',
    method: 'post'
  })
}
export function addUser() {
  return request({
    url: '/family/addUser',
    method: 'post'
  })
}
