import request from '@/utils/request'

export default {
  getIncomeList(searchModel) {
    return request({
      url: '/income/statistics',
      method: 'post',
      params: { year: searchModel.year }
    })
  }

}
