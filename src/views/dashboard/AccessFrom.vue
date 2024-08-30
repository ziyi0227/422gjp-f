<template>
  <div id="AccessFrom" :title="title" :style="{ width: '325px', height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center' }" />
</template>

<script>

export default {
  name: 'AccessFrom',

  data() {
    return {
      title: '生活用品类别'
    }
  },

  mounted() {
    this.drawLine()
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('AccessFrom'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 'bottom',
          left: 'center'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '生活用品类别',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '70%'],
            // adjust the start and end angle
            startAngle: 180,
            endAngle: 360,
            data: [
              { value: 1048, name: '服装' },
              { value: 735, name: '洗浴' },
              { value: 580, name: '电器' },
              { value: 484, name: '厨具' },
              { value: 300, name: '其他' }
            ]
          }
        ]
      })
    }
  }
}
</script>
