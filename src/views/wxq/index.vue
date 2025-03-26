<script>
export default {
  name: 'Index'
}
</script>

<template>
  <div class="dashboard-container">
    <div class="card-container">
      <el-card style="width: 100%">
        <div slot="header" class="header">
          成绩
        </div>
      </el-card>
      <el-card style="width: 100%">
        <div slot="header" class="header">
          用户数量
        </div>
      </el-card>
      <el-card style="width: 100%">
        <div slot="header" class="header">
          用户数量
        </div>
      </el-card>
      <el-card style="width: 100%">
        <div slot="header" class="header">
          用户数量
        </div>
      </el-card>
    </div>
    <div class="card-container">
      12123
    </div>
    <div class="card-container">
      12123
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
</style>
