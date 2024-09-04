<!--<template>-->
<!--  <div id="lineChart" :style="{ width: '550px', height: '375px' }" />-->
<!--</template>-->

<!--<script>-->
<!--import * as echarts from 'echarts/core'-->
<!--import {-->
<!--  DatasetComponent,-->
<!--  TitleComponent,-->
<!--  TooltipComponent,-->
<!--  GridComponent,-->
<!--  TransformComponent-->
<!--} from 'echarts/components'-->
<!--import { LineChart } from 'echarts/charts'-->
<!--import { LabelLayout, UniversalTransition } from 'echarts/features'-->
<!--import { CanvasRenderer } from 'echarts/renderers'-->

<!--echarts.use([-->
<!--  DatasetComponent,-->
<!--  TitleComponent,-->
<!--  TooltipComponent,-->
<!--  GridComponent,-->
<!--  TransformComponent,-->
<!--  LineChart,-->
<!--  CanvasRenderer,-->
<!--  LabelLayout,-->
<!--  UniversalTransition-->
<!--])-->

<!--export default {-->
<!--  name: 'LineChart',-->

<!--  data() {-->
<!--    return {-->
<!--      option: null,-->
<!--      datasetWithFilters: [],-->
<!--      seriesList: [],-->
<!--      sampleData: [-->
<!--        { Month: 1, category: '总支出', Expense: 400 },-->
<!--        { Month: 2, category: '总支出', Expense: 450 },-->
<!--        { Month: 3, category: '总支出', Expense: 500 },-->
<!--        { Month: 1, category: '工资支出', Expense: 380 },-->
<!--        { Month: 2, category: '工资支出', Expense: 420 },-->
<!--        { Month: 3, category: '工资支出', Expense: 480 },-->
<!--        { Month: 4, category: '工资支出', Expense: 480 },-->
<!--        { Month: 5, category: '工资支出', Expense: 480 }-->
<!--      ]-->
<!--    }-->
<!--  },-->

<!--  mounted() {-->
<!--    this.loadChartData(this.sampleData)-->
<!--  },-->

<!--  methods: {-->
<!--    loadChartData(_rawData) {-->
<!--      this.run(_rawData)-->
<!--      this.drawLine()-->
<!--    },-->

<!--    run(_rawData) {-->
<!--      const categories = [-->
<!--        '总支出',-->
<!--        '工资支出'-->
<!--      ]-->

<!--      this.datasetWithFilters = []-->
<!--      this.seriesList = []-->

<!--      categories.forEach(category => {-->
<!--        const datasetId = 'dataset_' + category-->
<!--        this.datasetWithFilters.push({-->
<!--          id: datasetId,-->
<!--          fromDatasetId: 'dataset_raw',-->
<!--          transform: {-->
<!--            type: 'filter',-->
<!--            config: {-->
<!--              and: [-->
<!--                { dimension: 'Month', gte: 1 },-->
<!--                { dimension: 'category', '=': category }-->
<!--              ]-->
<!--            }-->
<!--          }-->
<!--        })-->
<!--        this.seriesList.push({-->
<!--          type: 'line',-->
<!--          datasetId: datasetId,-->
<!--          showSymbol: false,-->
<!--          name: category,-->
<!--          endLabel: {-->
<!--            show: false,-->
<!--            formatter: params => `${params.value[1]}: ${params.value[2]}`-->
<!--          },-->
<!--          labelLayout: {-->
<!--            moveOverlap: 'shiftY'-->
<!--          },-->
<!--          emphasis: {-->
<!--            focus: 'series'-->
<!--          },-->
<!--          encode: {-->
<!--            x: 'Month',-->
<!--            y: 'Expense',-->
<!--            label: ['category', 'Expense'],-->
<!--            itemName: 'Month',-->
<!--            tooltip: ['Expense']-->
<!--          }-->
<!--        })-->
<!--      })-->

<!--      this.option = {-->
<!--        animationDuration: 10000,-->
<!--        dataset: [-->
<!--          {-->
<!--            id: 'dataset_raw',-->
<!--            source: _rawData-->
<!--          },-->
<!--          ...this.datasetWithFilters-->
<!--        ],-->
<!--        title: {-->
<!--          text: '月度支出统计',-->
<!--          left: '170px'-->
<!--        },-->
<!--        tooltip: {-->
<!--          order: 'valueDesc',-->
<!--          trigger: 'axis'-->
<!--        },-->
<!--        toolbox: {-->
<!--          show: true,-->
<!--          feature: {-->
<!--            mark: { show: true },-->
<!--            saveAsImage: { show: true }-->
<!--          }-->
<!--        },-->
<!--        xAxis: {-->
<!--          type: 'category',-->
<!--          nameLocation: 'middle'-->
<!--        },-->
<!--        yAxis: {-->
<!--          name: 'Expense'-->
<!--        },-->
<!--        grid: {-->
<!--          right: 140-->
<!--        },-->
<!--        series: this.seriesList-->
<!--      }-->
<!--    },-->

<!--    drawLine() {-->
<!--      const chartDom = document.getElementById('lineChart')-->
<!--      if (chartDom) {-->
<!--        const myChart = echarts.init(chartDom)-->
<!--        if (this.option) {-->
<!--          myChart.setOption(this.option)-->
<!--        }-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<template>
  <div id="lineChart" :style="{ width: '550px', height: '375px' }"></div>
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
import exCategoryApi from "@/api/exCategory";

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
  name: 'LineChart',

  data() {
    return {
      option: null,
      datasetWithFilters: [],
      seriesList: [],
    }
  },

  mounted() {
    this.fetchData() // 挂载后调用方法获取数据
  },

  methods: {
    // 获取数据的方法
    fetchData() {
      exCategoryApi.getLineChartData().then(response => {
        this.loadChartData(response.data)
      }).catch(error => {
        console.error('获取数据失败', error)
      })
    },

    // 处理并加载数据的方法
    loadChartData(data) {
      const formattedData = this.formatDataForChart(data)
      this.run(formattedData)
      this.drawLine()
    },

    // 格式化数据以适应 ECharts 的数据结构
    formatDataForChart(data) {
      const months = Array.from({ length: 12 }, (_, i) => i + 1) // 1 到 12 月
      const categories = [...new Set(Object.values(data).flatMap(monthData => Object.keys(monthData)))]
      const formattedData = []

      months.forEach(month => {
        let monthTotal = 0

        categories.forEach(category => {
          const amount = data[month]?.[category] || 0
          monthTotal += amount
          formattedData.push({
            Month: month,
            category: category,
            Expense: amount
          })
        })

        // 添加每个月的总支出
        formattedData.push({
          Month: month,
          category: '总支出',
          Expense: monthTotal
        })
      })

      return formattedData
    },

    run(_rawData) {
      const categories = [...new Set(_rawData.map(item => item.category))] // 获取所有的类别

      this.datasetWithFilters = []
      this.seriesList = []

      categories.forEach(category => {
        const datasetId = 'dataset_' + category
        this.datasetWithFilters.push({
          id: datasetId,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Month', gte: 1 },
                { dimension: 'category', '=': category }
              ]
            }
          }
        })
        this.seriesList.push({
          type: 'line',
          datasetId: datasetId,
          showSymbol: false,
          name: category,
          endLabel: {
            show: false,
            formatter: params => `${params.value[1]}: ${params.value[2]}`
          },
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          emphasis: {
            focus: 'series'
          },
          encode: {
            x: 'Month',
            y: 'Expense',
            label: ['category', 'Expense'],
            itemName: 'Month',
            tooltip: ['Expense']
          }
        })
      })

      this.option = {
        animationDuration: 10000,
        dataset: [
          {
            id: 'dataset_raw',
            source: _rawData
          },
          ...this.datasetWithFilters
        ],
        title: {
          text: '月度支出统计',
          left: '170px'
        },
        tooltip: {
          order: 'valueDesc',
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: { show: true }
          }
        },
        xAxis: {
          type: 'category',
          nameLocation: 'middle'
        },
        yAxis: {
          name: 'Expense'
        },
        grid: {
          right: 140
        },
        series: this.seriesList
      }
    },

    drawLine() {
      const chartDom = document.getElementById('lineChart')
      if (chartDom) {
        const myChart = echarts.init(chartDom)
        if (this.option) {
          myChart.setOption(this.option)
        }
      }
    }
  }
}
</script>

