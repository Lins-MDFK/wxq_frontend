<script>
import UpdateDialog from './dialog/update-dialog.vue'
import AddDialog from './dialog/add-dialog.vue'

export default {
  name: 'Table',
  components: {
    UpdateDialog,
    AddDialog
  },
  props: {
    tableData: {
      default: () => [],
      type: Array
    },
    columns: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
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

<template>
  <el-card>
    <div slot="header" class="clearfix">
      <el-button style="float: right;" type="text" @click="openAddDialog">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" fit>
      <el-table-column
        v-for="(column, i) in columns"
        :key="i"
        :prop="column.prop"
        :label="column.label"
        :sortable="column.sortable"
      />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            @click="handleClick(row)"
          >查看</el-button>
          <el-button
            type="text"
            size="small"
            @click="openUpdateDialog"
          >编辑</el-button>
          <div style="display: inline-flex; margin-left: 10px">
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="点错了"
              icon="el-icon-info"
              icon-color="red"
              title="这是个危险操作, 确认要删除吗？"
            >
              <el-button
                slot="reference"
                type="text"
                size="small"
              >删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination style="width: 200px" />
    </div>
    <add-dialog :visible.sync="addDialogVisible" />
    <update-dialog :visible.sync="updateDialogVisible" />
  </el-card>
</template>

<style scoped lang="scss">
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0px;
}
</style>
