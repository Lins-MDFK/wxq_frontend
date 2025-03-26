<script>
import * as echarts from 'echarts'

export default {
  name: 'Chart1',
  data: function() {
    return {
      option: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: [
            'rose1',
            'rose2',
            'rose3',
            'rose4',
            'rose5',
            'rose6',
            'rose7',
            'rose8'
          ]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true }
          }
        },
        series: [
          {
            name: 'Radius Mode',
            type: 'pie',
            radius: [20, 140],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 5
            },
            label: {
              show: false
            },
            emphasis: {
              label: {
                show: true
              }
            },
            data: [
              { value: 40, name: 'rose 1' },
              { value: 33, name: 'rose 2' },
              { value: 28, name: 'rose 3' },
              { value: 22, name: 'rose 4' },
              { value: 20, name: 'rose 5' },
              { value: 15, name: 'rose 6' },
              { value: 12, name: 'rose 7' },
              { value: 10, name: 'rose 8' }
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
