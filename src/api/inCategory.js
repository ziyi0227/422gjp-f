import request from '@/utils/request'
export default {
  getCategoryList() {
    return request({
      url: '/incategory/search',
      method: 'post'
    })
  },
  getSecondCategoryList(searchModel) {
    return request({
      url: '/incategory/search/second',
      method: 'post',
      params: {
        parentId: searchModel.id
      }
    })
  },

  getLineChartData() {
    return request({
      url: '/income/everyMonth/statistics',
      method: 'post',
      params: {
        year: '2024'
      }
    })
  }
}
