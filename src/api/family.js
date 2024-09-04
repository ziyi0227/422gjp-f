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
export function updateInfo(data) {
  return request({
    url: '/family/updateInfo',
    method: 'post',
    data: data
  })
}
export function deleteUser(data) {
  return request({
    url: '/family/deleteUser',
    method: 'post',
    data: data
  })
}
export function addUser(data) {
  return request({
    url: '/family/addUser',
    method: 'post',
    data: data
  })
}
export function updateUser(data) {
  return request({
    url: '/family/updateUser',
    method: 'post',
    data: data
  })
}
export function getFamilyUser() {
  return request({
    url: '/family/getFamilyUser',
    method: 'post'
  })
}
export function getDashboardInfo() {
  return request({
    url: '/family/getDashboardInfo',
    method: 'post'
  })
}
  export function getFamilyIncomeAndExpense() {
    return request({
      url: '/family/getFamilyIncomeAndExpense',
      method: 'post',
      params: {
        year: '2024'
      }
    })
  }


