import request from '@/utils/request'
export default {
  getOutCategoryList() {
    return request({
      url: '/excategory/search',
      method: 'post'
    })
  },
  // getSecondCategoryList(searchModel) {
  //   return request({
  //     url: '/excategory/search/second',
  //     method: 'post',
  //     params: {
  //       parentId: searchModel.id
  //     }
  //   })
  // },

  getLineChartData() {
    return request({
      url: '/expense/everyMonth/statistics',
      method: 'post',
      params: {
        year: '2024'
      }
    })
  }
}
