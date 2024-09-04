<template>
  <div id="lineChartOut" :style="{ width: '550px', height: '375px' }" />
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
import inCategory from '@/api/inCategory'

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
  name: 'LineChartOut',

  data() {
    return {
      option: null,
      datasetWithFilters: [],
      seriesList: []
    }
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      inCategory.getLineChartData().then(response => {
        this.loadChartData(response.data)
      }).catch(error => {
        console.error('获取数据失败', error)
      })
    },

    loadChartData(data) {
      const formattedData = this.formatDataForChart(data)
      this.run(formattedData)
      this.drawLine()
    },

    formatDataForChart(data) {
      const months = Array.from({ length: 12 }, (_, i) => i + 1)
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
            Income: amount
          })
        })

        formattedData.push({
          Month: month,
          category: '总收入',
          Income: monthTotal
        })
      })

      return formattedData
    },

    run(_rawData) {
      const categories = [...new Set(_rawData.map(item => item.category))]

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
            y: 'Income',
            label: ['category', 'Income'],
            itemName: 'Month',
            tooltip: ['Income']
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
          text: '月度收入统计',
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
          name: 'Income'
        },
        grid: {
          right: 140
        },
        series: this.seriesList
      }
    },

    drawLine() {
      const chartDom = document.getElementById('lineChartOut')// Updated ID
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
