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
        { Year: 1950, Country: 'Germany', Income: 400 },
        { Year: 1960, Country: 'Germany', Income: 450 },
        { Year: 1970, Country: 'Germany', Income: 500 },
        { Year: 1950, Country: 'France', Income: 380 },
        { Year: 1960, Country: 'France', Income: 420 },
        { Year: 1970, Country: 'France', Income: 480 },
        { Year: 1980, Country: 'France', Income: 480 },
        { Year: 1990, Country: 'France', Income: 480 }
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
      const countries = [
        'Germany',
        'France'
      ]

      this.datasetWithFilters = []
      this.seriesList = []

      countries.forEach(country => {
        const datasetId = 'dataset_' + country
        this.datasetWithFilters.push({
          id: datasetId,
          fromDatasetId: 'dataset_raw',
          transform: {
            type: 'filter',
            config: {
              and: [
                { dimension: 'Year', gte: 1950 },
                { dimension: 'Country', '=': country }
              ]
            }
          }
        })
        this.seriesList.push({
          type: 'line',
          datasetId: datasetId,
          showSymbol: false,
          name: country,
          endLabel: {
            show: true,
            formatter: params => params.value[3] + ': ' + params.value[0]
          },
          labelLayout: {
            moveOverlap: 'shiftY'
          },
          emphasis: {
            focus: 'series'
          },
          encode: {
            x: 'Year',
            y: 'Income',
            label: ['Country', 'Income'],
            itemName: 'Year',
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
          text: '月度收入统计'
        },
        tooltip: {
          order: 'valueDesc',
          trigger: 'axis'
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
