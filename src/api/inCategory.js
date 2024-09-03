import request from '@/utils/request'


export default {
  getCategoryList() {
    return request({
      url: '/incategory/search',
      method: 'post',
    })
  },
  getSecondCategoryList(searchModel) {
    return request({
      url: '/incategory/search/second',
      method: 'post',
      params: {
       parentId:searchModel.id,
      }
    })
  }
}
