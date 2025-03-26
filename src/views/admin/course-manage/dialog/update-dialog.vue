<script>
export default {
  name: 'UpdateModal',
  props: {
    visible: Boolean
  },
  data: function() {
    return {
      form: {
        id: '1',
        username: '李二狗',
        major: '软件工程',
        score: '123',
        role: '学生'
      }
    }
  }
}
</script>

<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="() => {
        this.$emit('update:visible', false)
      }"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="id">
          <el-input v-model="form.id" />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="专业">
          <el-input v-model="form.major" />
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model="form.score" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss" ></style>

