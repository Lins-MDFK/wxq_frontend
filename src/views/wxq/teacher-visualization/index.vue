<script>
import Chart1 from './Chart-1.vue'
import Chart2 from './Chart-2.vue'
import Chart3 from './Chart-3.vue'
import Chart4 from './Chart-4.vue'

export default {
  name: 'TeacherVisualization',
  components: { Chart1, Chart2, Chart3, Chart4 }
}
</script>

<template>
  <div class="dashboard-container">
    <div class="card-container">
      <el-card
        style="width: 100%"
        :body-style="{
          justifyContent: 'center',
          display: 'flex',
        }"
      >
        <div slot="header" class="header">用户数量</div>
        <chart1 />
      </el-card>
      <el-card
        style="width: 100%"
        :body-style="{
          justifyContent: 'center',
          display: 'flex',
        }"
      >
        <div slot="header" class="header">测试2</div>
        <chart2 />
      </el-card>
      <el-card
        style="width: 100%"
        :body-style="{
          justifyContent: 'center',
          display: 'flex',
        }"
      >
        <div slot="header" class="header">用户数量</div>
        <chart3 />
      </el-card>
      <el-card
        style="width: 100%"
        :body-style="{
          justifyContent: 'center',
          display: 'flex',
        }"
      >
        <div slot="header" class="header">用户数量</div>
        <chart4 />
      </el-card>
    </div>
    <div class="card-container wrap" style="justify-content: space-around">
      <div class="header"><span>统计</span></div>
      <div class="chart">
        统计1
        <Chart1 />
      </div>
      <div class="chart">
        统计2
        <Chart1 />
      </div>
      <div class="chart">
        统计3
        <Chart1 />
      </div>
      <div class="chart">
        统计4
        <Chart1 />
      </div>
    </div>
    <div class="card-container wrap" style="justify-content: space-around">
      <div class="header"><span>统计2</span></div>
      <div class="chart">
        统计1
        <Chart4 />
      </div>
      <div class="chart">
        统计2
        <Chart4 />
      </div>
      <div class="chart">
        统计3
        <Chart4 />
      </div>
      <div class="chart">
        统计4
        <Chart4 />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dashboard-container {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
}
.card-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
  box-shadow: 0px 0px 20px 1px #ddd;
  border-radius: 5px;
}
.card-container.wrap {
  flex-wrap: wrap;
}
.card-container {
  .header {
    width: 100%;
    padding: 20px;
  }
  .chart {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
}
</style>
