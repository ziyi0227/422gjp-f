<template>
  <div id="CircleAccessFrom" :title="title" :style="{ width: '300px', height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center' }" />
</template>

<script>

export default {
  name: 'CircleAccessFrom',

  data() {
    return {
      title: '教育用品类别'
    }
  },

  mounted() {
    this.drawLine()
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('CircleAccessFrom'))
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
            name: '教育用品类别',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            padAngle: 5,
            itemStyle: {
              borderRadius: 10
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: '书籍' },
              { value: 735, name: '笔记本' },
              { value: 580, name: '文具' },
              { value: 484, name: '运动用品' },
              { value: 300, name: '网课' }
            ]
          }
        ]
      })
    }
  }
}
</script>
