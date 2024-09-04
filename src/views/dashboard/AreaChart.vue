<!--<template>-->
<!--  <div id="AreaChart" :title="title" :style="{ width: '700px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }" />-->
<!--</template>-->

<!--<script>-->

<!--export default {-->
<!--  name: 'AreaChart',-->

<!--  data() {-->
<!--    return {-->
<!--      title: '资产统计'-->
<!--    }-->
<!--  },-->

<!--  mounted() {-->
<!--    this.drawLine()-->
<!--  },-->

<!--  methods: {-->
<!--    drawLine() {-->
<!--      // 基于准备好的dom，初始化echarts实例-->
<!--      const myChart = this.$echarts.init(document.getElementById('AreaChart'))-->
<!--      // 绘制图表-->
<!--      myChart.setOption({-->
<!--        title: {-->
<!--          text: '资金月度统计',-->
<!--          textStyle: {-->
<!--            // lineHeight: '10px'-->
<!--            padding: 10-->
<!--          }-->
<!--        },-->
<!--        tooltip: {-->
<!--          trigger: 'axis',-->
<!--          axisPointer: {-->
<!--            type: 'cross',-->
<!--            label: {-->
<!--              backgroundColor: '#6a7985'-->
<!--            }-->
<!--          }-->
<!--        },-->
<!--        legend: {-->
<!--          data: ['总收入', '总支出', '成员1收入', '成员1支出'],-->
<!--          // 放在底下-->
<!--          type: 'scroll'-->
<!--        },-->
<!--        toolbox: {-->
<!--          feature: {-->
<!--            saveAsImage: {}-->
<!--          }-->
<!--        },-->
<!--        grid: {-->
<!--          left: '3%',-->
<!--          right: '4%',-->
<!--          bottom: '3%',-->
<!--          containLabel: true-->
<!--        },-->
<!--        xAxis: [-->
<!--          {-->
<!--            type: 'category',-->
<!--            boundaryGap: false,-->
<!--            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月']-->
<!--          }-->
<!--        ],-->
<!--        yAxis: [-->
<!--          {-->
<!--            type: 'value'-->
<!--          }-->
<!--        ],-->
<!--        series: [-->
<!--          {-->
<!--            name: '总收入',-->
<!--            type: 'line',-->
<!--            stack: 'Total',-->
<!--            areaStyle: {},-->
<!--            emphasis: {-->
<!--              focus: 'series'-->
<!--            },-->
<!--            data: [120, 132, 101, 134, 90, 230, 210]-->
<!--          },-->
<!--          {-->
<!--            name: '总支出',-->
<!--            type: 'line',-->
<!--            stack: 'Total',-->
<!--            areaStyle: {},-->
<!--            emphasis: {-->
<!--              focus: 'series'-->
<!--            },-->
<!--            data: [220, 182, 191, 234, 290, 330, 310]-->
<!--          },-->
<!--          {-->
<!--            name: '成员1收入',-->
<!--            type: 'line',-->
<!--            stack: 'Total',-->
<!--            areaStyle: {},-->
<!--            emphasis: {-->
<!--              focus: 'series'-->
<!--            },-->
<!--            data: [150, 232, 201, 154, 190, 330, 410]-->
<!--          },-->
<!--          {-->
<!--            name: '成员1支出',-->
<!--            type: 'line',-->
<!--            stack: 'Total',-->
<!--            areaStyle: {},-->
<!--            emphasis: {-->
<!--              focus: 'series'-->
<!--            },-->
<!--            data: [320, 332, 301, 334, 390, 330, 320]-->
<!--          }-->
<!--        ]-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<template>
  <div id="AreaChart" :style="{ width: '700px', height: '400px' }" />
</template>

<script>
import * as echarts from 'echarts/core'
import {
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent
} from 'echarts/components'
import { LineChart } from 'echarts/charts'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
import { getFamilyIncomeAndExpense } from "@/api/family";

echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  TransformComponent,
  LineChart,
  CanvasRenderer,
  LabelLayout,
  UniversalTransition
])

export default {
  name: 'AreaChart',

  data() {
    return {
      option: null
    }
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      getFamilyIncomeAndExpense().then(response => {
        this.loadChartData(response.data)
      }).catch(error => {
        console.error('获取数据失败', error)
      })
    },

    loadChartData(data) {
      const formattedData = this.formatDataForChart(data)
      this.drawChart(formattedData)
    },

    formatDataForChart(data) {
      const months = Array.from({ length: 12 }, (_, i) => `${i + 1}月`) // 月份
      const series = []

      for (const [userKey, monthlyData] of Object.entries(data)) {
        series.push({
          name: userKey,
          type: 'line',
          stack: 'Total',
          areaStyle: {},
          emphasis: {
            focus: 'series'
          },
          data: months.map(month => monthlyData[month] || 0) // 每个月的数据
        })
      }

      return {
        title: {
          text: '每月收入与支出统计',
          left: 'left',
          top: 'top', // 将 title 放置在顶部
          padding: [5, 0, 0, 0] // 增加顶部内边距
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: Object.keys(data),
          type: 'scroll',
          top: '20px' // 将 legend 移动到 title 下面
        },
        toolbox: {
          feature: {
            // saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '100px', // 增加顶部内边距以适应 title 和 legend
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: months
        },
        yAxis: {
          type: 'value'
        },
        series: series
      }
    },

    drawChart(option) {
      const chartDom = document.getElementById('AreaChart')
      if (chartDom) {
        const myChart = echarts.init(chartDom)
        if (option) {
          myChart.setOption(option)
        }
      }
    }
  }
}
</script>
