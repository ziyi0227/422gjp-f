<template>
  <div id="NightingaleChart" :title="title" :style="{ width: '350px', height: '420px', display: 'flex', justifyContent: 'center', alignItems: 'center' }" />
</template>

<script>

export default {
  name: 'NightingaleChart',

  data() {
    return {
      title: '消费饭店榜'
    }
  },

  mounted() {
    this.drawLine()
  },

  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = this.$echarts.init(document.getElementById('NightingaleChart'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: this.title,
          left: 'center'
        },
        legend: {
          top: 'bottom'
        },
        tooltip: {
          trigger: 'item'
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
            name: '消费饭店榜',
            type: 'pie',
            radius: [50, 110],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 40, name: '重庆小面' },
              { value: 38, name: '衢州小炒' },
              { value: 32, name: '在西安' },
              { value: 30, name: '麦当劳' },
              { value: 28, name: '华莱士' }
            ]
          }
        ]
      })
    }
  }
}
</script>
