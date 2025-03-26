<template>
  <div class="table-manage-page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>学院管理</span>
      </div>
      <Table :columns="columns" :table-data="tableData" />
    </el-card>

  </div>
</template>
<script>
import Table from './table.vue'

export default {
  components: {
    Table
  },
  data() {
    return {
      tableData: [{ id: '1' }],
      columns: [{ prop: 'id', label: 'id' }],
      addDialogVisible: false,
      updateDialogVisible: false
    }
  },
  methods: {
    handleClick(row) {
      console.log(row)
    },
    openAddDialog() {
      this.addDialogVisible = true
    },
    openUpdateDialog() {
      this.updateDialogVisible = true
    }
  }
}
</script>
<style>
.table-manage-page {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.page-header {
  width: 100%;
  background: #fff;
  padding: 20px;
}
.page-header {
  span {
  }
}
</style>
