<template>
  <div class="table-manage-page">
    <el-card>
      <div slot="header" class="clearfix">
        <span>用户管理</span>
      </div>
      <Table  />
    </el-card>

  </div>
</template>
<script>
import Table from './table.vue'
import { getUserList } from '@/api/user'

export default {
  components: {
    Table
  },
  data() {
    return {

    }
  },
  methods: {
  },

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
