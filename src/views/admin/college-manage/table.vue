<template>
  <el-card>
    <div slot="header" class="clearfix">
      <el-button style="float: right;" type="text" @click="openAddDialog">添加</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%" fit>
      <el-table-column v-for="(column, i) in columns" :key="i" :prop="column.prop" :label="column.label"
        :sortable="column.sortable" />
      <el-table-column fixed="right" label="操作">
        <template slot-scope="{ row }">
          <el-button type="text" size="small" @click="handleClick(row)">查看</el-button>
          <el-button type="text" size="small" @click="openUpdateDialog">编辑</el-button>
          <div style="display: inline-flex; margin-left: 10px">
            <el-popconfirm confirm-button-text="确认" cancel-button-text="点错了" icon="el-icon-info" icon-color="red"
              title="这是个危险操作, 确认要删除吗？">
              <el-button slot="reference" type="text" size="small">删除</el-button>
            </el-popconfirm>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
      :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <add-dialog :visible.sync="addDialogVisible" />
    <update-dialog :visible.sync="updateDialogVisible" />
  </el-card>
</template>

<script>
import UpdateDialog from './dialog/update-dialog.vue'
import AddDialog from './dialog/add-dialog.vue'
import { getCollegeList } from '@/api/user'

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
      pageSize: 5,
      total: 0,
      columns: [
        { prop: 'id', label: 'id', sortable: true },
        { prop: 'collegeCode', label: '学院编号' },
        { prop: 'collegeName', label: '学院名称' },
      ],
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
    },
    doGetCollegeList() {
      const formData = new FormData()

      formData.append('page', this.page)
      formData.append('size', this.pageSize);

      getCollegeList(formData).then(res => {

        const { data } = res
        const { content } = data
        const { totalElements } = data
        this.tableData = content
        this.total = totalElements;
        console.log(data)
      })
    },
    //每页大小改变事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.doGetCollegeList()
    },
    //当前页改变事件
    handleCurrentChange(val) {
      console.log(val)
      this.page = val
      this.doGetCollegeList()
    }
  },
  mounted() {
    this.doGetCollegeList()
  }
}
</script>

<style scoped lang="scss">
.pagination-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 20px 0px;
}

.el-pagination {
  text-align: right;
  margin-top: 15px;
}
</style>
