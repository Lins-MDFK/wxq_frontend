<script>
import * as echarts from 'echarts'

export default {
  name: 'Chart1',
  data: function() {
    return {
      option: {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ]
          }
        ]
      },
      chartInstance: null
    }
  },
  mounted() {
    this.chartInstance = echarts.init(this.$refs.chartContainer, null, {
      renderer: 'canvas',
      useDirtyRect: false
    })

    this.chartInstance.setOption(this.option)
  }
}
</script>

<template>
  <div ref="chartContainer" class="chart-container" />
</template>

<style scoped lang="scss">
.chart-container {
  width: 300px;
  height: 350px;
}
</style>
