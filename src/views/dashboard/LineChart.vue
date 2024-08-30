<template>
  <div id="lineChart" :style="{ width: '550px', height: '375px' }" />
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
      sampleData: [
        { Month: 1, category: '总收入', Income: 400 },
        { Month: 2, category: '总收入', Income: 450 },
        { Month: 3, category: '总收入', Income: 500 },
        { Month: 1, category: '工资收入', Income: 380 },
        { Month: 2, category: '工资收入', Income: 420 },
        { Month: 3, category: '工资收入', Income: 480 },
        { Month: 4, category: '工资收入', Income: 480 },
        { Month: 5, category: '工资收入', Income: 480 }
      ]
    }
  },

  mounted() {
    this.loadChartData(this.sampleData)
  },

  methods: {
    loadChartData(_rawData) {
      this.run(_rawData)
      this.drawLine()
    },

    run(_rawData) {
      const categories = [
        '总收入',
        '工资收入'
      ]

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
