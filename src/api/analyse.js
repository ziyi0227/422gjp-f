import request from '@/utils/request'
export default {
  getExpenseAnalyse(){
    return request({
      url: '/AI/analyze/expense',
      method: 'post'
    })
  },
  getIncomeAnalyse(){
    return request({
      url: '/AI/analyze/income',
      method: 'post'
    })
  },
  getMemberAnalyse(){
    return request({
      url: '/AI/analyze/member',
      method: 'post'
    })
  }
}
