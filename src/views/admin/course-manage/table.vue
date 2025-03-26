<script>
import UpdateDialog from './dialog/update-dialog.vue'
import AddDialog from './dialog/add-dialog.vue'
import { getUserList } from '@/api/user'

export default {
  name: 'Table',
  components: {
    UpdateDialog,
    AddDialog
  },
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 3,
      total: 0,
      columns: [
        { prop: 'c_id', label: 'id', sortable: true },
        { prop: 'c_no', label: '编号' },
        { prop: 'c_name', label: '课程' },
        { prop: 'userid', label: '用户' },
        { prop: 'c_credit', label: '分数' },
        { prop: 'update_time', label: '更新时间' },
        { prop: 'create_time', label: '创建时间' }
      ],
      addDialogVisible: false,
      updateDialogVisible: false
    }
  },
  mounted() {
    this.doGetUserList()
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
    },
    doGetUserList() {
      const formData = new FormData()

      formData.append('page', this.page)
      formData.append('size', this.pageSize)

      getUserList(formData).then(res => {
        const { data } = res
        const { content } = data

        this.tableData = content
        this.total = res.total
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(val)
      this.page = val
      this.doGetUserList()
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
          <el-button type="text" size="small" @click="handleClick(row)">查看</el-button>
          <el-button type="text" size="small" @click="openUpdateDialog">编辑</el-button>
          <div style="display: inline-flex; margin-left: 10px">
            <el-popconfirm
              confirm-button-text="确认"
              cancel-button-text="点错了"
              icon="el-icon-info"
              icon-color="red"
              title="这是个危险操作, 确认要删除吗？"
            >
              <el-button slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
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
