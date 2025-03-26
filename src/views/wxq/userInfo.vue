<template>
  <div class="userinfo-container">
    <el-card style="padding: 20px;box-sizing: border-box;">
      <div slot="header" class="clearfix">
        <span>用户信息</span>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="头像">
          <el-avatar></el-avatar>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.create_time" disabled></el-input>
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="form.updateTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-input v-model="form.role" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        username: '李二狗',
        update_time: '23点41分',
        create_time: '23点41分',
        role: '学生'
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
    }
  }
}
</script>
