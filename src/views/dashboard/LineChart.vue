<template>
  <LineChart class="chart" :option="option" />
</template>

<script>
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import { GridComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([GridComponent, LineChart, CanvasRenderer])

export default {
  name: 'LineChart',
  data() {
    return {
      option: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }
  }
}
</script>

<style scoped>

</style>
