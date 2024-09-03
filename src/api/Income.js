import request from '@/utils/request'

export default {
  getIncomeList(searchModel) {
    return request({
      url: '/income/search/all',
      method: 'post',
      params: {
        currentPage: searchModel.pageNo,
        pageSize: searchModel.pageSize
      }
    })
  },
  deleteIncomeByID(id) {
    return request({
      url: '/income/delete',
      method: 'post',
      params: { id: id }
    })
  },
  addIncome(data) {
    return request({
      url: '/income/add',
      method: 'post',
      data: data
    })
  },
  updateIncome(data) {
    return request({
      url: '/income/update',
      method: 'post',
      data: data
    })
  },
  selectIncome(data) {
    return request({
      url: '/income/search',
      method: 'post',
      data: data
    })
  }
}
