<template>
  <div id="bingChartOut" :title="title" :style="{ width: '450px', height: '275px', display: 'flex', justifyContent: 'center', alignItems: 'center' }" />
</template>

<script>

export default {
  name: 'BingChartOut',

  data() {
    return {
      title: '支出类别统计'
    }
  },

  mounted() {
    this.drawLine()
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('bingChartOut'))
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
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: { show: true }
          }
        },
        color: ['#6eb158', '#cdcdcd', '#3f8cff'],
        series: [
          {
            name: '支出类别',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: '吃饭' },
              { value: 735, name: '玩' },
              { value: 580, name: '氪金' }
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
