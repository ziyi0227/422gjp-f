<template>
  <div id="NightingaleChart" :title="title" :style="{ width: '450px', height: '275px', display: 'flex', justifyContent: 'center', alignItems: 'center' }" />
</template>

<script>

export default {
  name: 'NightingaleChart',

  data() {
    return {
      title: '收入类别统计'
    }
  },

  mounted() {
    this.drawLine()
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('bingChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          top: '10%',
          left: 'center'
        },
        color: ['#6eb158', '#cdcdcd', '#3f8cff'],
        series: [
          {
            name: '收入类别',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '工资与奖金' },
              { value: 735, name: '摆摊收入' },
              { value: 580, name: '红包收入' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}:}{c}  {per|{d}%}  ',
              backgroundColor: '',
              borderColor: '',
              borderWidth: 1,
              borderRadius: 4,
              rich: {}
            }
          }
        ]
      })
    }
  }
}
</script>
