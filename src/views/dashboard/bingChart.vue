<!--<template>-->
<!--  <div id="bingChart" :title="title" :style="{ width: '450px', height: '275px', display: 'flex', justifyContent: 'center', alignItems: 'center' }" />-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: 'BingChart',-->

<!--  data() {-->
<!--    return {-->
<!--      title: '收入类别统计'-->
<!--    }-->
<!--  },-->

<!--  mounted() {-->
<!--    this.drawLine()-->
<!--  },-->

<!--  methods: {-->
<!--    drawLine() {-->
<!--      // 基于准备好的dom，初始化echarts实例-->
<!--      const myChart = this.$echarts.init(document.getElementById('bingChart'))-->
<!--      // 绘制图表-->
<!--      myChart.setOption({-->
<!--        title: {-->
<!--          text: this.title,-->
<!--          left: 'center'-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: 'item',-->
<!--          formatter: '{a} <br/>{b}: {c} ({d}%)'-->
<!--        },-->
<!--        legend: {-->
<!--          top: '10%',-->
<!--          left: 'center'-->
<!--        },-->
<!--        toolbox: {-->
<!--          show: true,-->
<!--          feature: {-->
<!--            mark: { show: true },-->
<!--            saveAsImage: { show: true }-->
<!--          }-->
<!--        },-->
<!--        color: ['#6eb158', '#cdcdcd', '#3f8cff'],-->
<!--        series: [-->
<!--          {-->
<!--            name: '收入类别',-->
<!--            type: 'pie',-->
<!--            radius: '50%',-->
<!--            data: [-->
<!--              { value: 1048, name: '工资与奖金' },-->
<!--              { value: 735, name: '摆摊收入' },-->
<!--              { value: 580, name: '红包收入' }-->
<!--            ],-->
<!--            emphasis: {-->
<!--              itemStyle: {-->
<!--                shadowBlur: 10,-->
<!--                shadowOffsetX: 0,-->
<!--                shadowColor: 'rgba(0, 0, 0, 0.5)'-->
<!--              }-->
<!--            },-->
<!--            label: {-->
<!--              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}:}{c}  {per|{d}%}  ',-->
<!--              backgroundColor: '',-->
<!--              borderColor: '',-->
<!--              borderWidth: 1,-->
<!--              borderRadius: 4,-->
<!--              rich: {}-->
<!--            }-->
<!--          }-->
<!--        ]-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<template>
  <div id="bingChart" :title="title" :style="{ width: '450px', height: '275px', display: 'flex', justifyContent: 'center', alignItems: 'center' }" />
</template>

<script>
import exCategoryApi from "@/api/exCategory";

export default {
  name: 'BingChart',

  data() {
    return {
      title: '支出类别统计'
    }
  },

  mounted() {
    this.fetchData() // Fetch data on mount
  },

  methods: {
    // Fetch data from the backend API
    fetchData() {
      exCategoryApi.getLineChartData().then(response => {
        const processedData = this.processData(response.data)
        this.drawPieChart(processedData)
      }).catch(error => {
        console.error('获取数据失败', error)
      })
    },

    // Process data to calculate proportions and prepare it for the pie chart
    processData(data) {
      const categoryTotals = {}

      // Calculate total for each category
      Object.values(data).forEach(monthData => {
        Object.keys(monthData).forEach(category => {
          if (!categoryTotals[category]) {
            categoryTotals[category] = 0
          }
          categoryTotals[category] += monthData[category]
        })
      })

      // Convert to array and sort by total descending
      const sortedCategories = Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])

      // Get top 5 categories
      const topCategories = sortedCategories.slice(0, 5)

      // Combine remaining into "Other"
      const otherTotal = sortedCategories.slice(5).reduce((sum, entry) => sum + entry[1], 0)
      if (otherTotal > 0) {
        topCategories.push(['其他', otherTotal])
      }

      return topCategories.map(entry => ({ name: entry[0], value: entry[1] }))
    },

    // Draw the pie chart with the processed data
    drawPieChart(data) {
      const chartDom = document.getElementById('bingChart')
      const myChart = this.$echarts.init(chartDom)
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
        color: ['#6eb158', '#cdcdcd', '#3f8cff', '#ff9f7f', '#ffdb5c', '#37a2da'],
        series: [
          {
            name: '支出类别',
            type: 'pie',
            radius: '50%',
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{b}: {c} ({d}%)',
              rich: {}
            }
          }
        ]
      })
    }
  }
}
</script>
