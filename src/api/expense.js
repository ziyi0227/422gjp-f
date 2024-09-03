import request from '@/utils/request'

export default {
  getExpenseList(searchModel) {
    return request({
      url: '/expense/search/all',
      method: 'post',
      params: {
        currentPage: searchModel.pageNo,
        pageSize: searchModel.pageSize
      }
    })
  },
  deleteExpenseByID(id) {
    return request({
      url: '/expense/delete',
      method: 'post',
      params: { id: id }
    })
  },
  addExpense(data) {
    return request({
      url: '/expense/add',
      method: 'post',
      data: data
    })
  },
  updateExpense(data) {
    return request({
      url: '/expense/update',
      method: 'post',
      data: data
    })
  },
  selectExpense(data) {
    return request({
      url: '/expense/search',
      method: 'post',
      data: data
    })
  }
}
