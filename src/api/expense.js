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
  }
}
