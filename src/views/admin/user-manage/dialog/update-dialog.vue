<script>
export default {
  name: 'UpdateModal',
  props: {
    visible: Boolean
  },
  data: function() {
    return {
      form: {
        id: '',
        user_id: '',
        username: '',
        role: '',
        avatar_url: '',
        is_deleted: '',
        create_time: '',
        update_time: ''
      },
      roleOptions: [
        {
          label: '学生',
          value: '学生'
        },
        {
          label: '老师',
          value: '老师'
        }
      ],
      uploadFileBase64: ''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    handleChange(file, fileList) {
      console.log(file)
      const _this = this
      const reader = new FileReader()
      _this.uploadFileBase64 = ''

      reader.onload = function(e) {
        _this.uploadFileBase64 = e.target.result
      }

      reader.readAsDataURL(file.raw)
    },
    doUpdateInfo() {
      const formData = new FormData()

      formData.append('avatar', '')
      formData.append('avatar', '')
      formData.append('avatar', '')
      formData.append('avatar', '')
    }
  }
}
</script>

<template>
  <div>
    <el-dialog
      :visible="visible"
      @close="
        () => {
          this.$emit('update:visible', false);
        }
      "
    >
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="排序id">
          <el-input v-model="form.id" disabled />
        </el-form-item>
        <el-form-item label="用户id">
          <el-input v-model="form.user_id" disabled />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="权限">
          <el-select v-model="form.role" placeholder="请选择">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="头像地址">
          <div class="upload-container">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-change="handleChange"
            >
              <img
                v-if="uploadFileBase64"
                :src="uploadFileBase64"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </div>
          <el-input v-model="form.avatar_url" disabled />
        </el-form-item>
        <el-form-item label="是否已删除">
          <el-input v-model="form.is_deleted" disabled />
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="form.create_time" disabled />
        </el-form-item>
        <el-form-item label="更新时间">
          <el-input v-model="form.update_time" disabled />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  padding: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-img {
  width: 178px;
  height: 178px;
  object-fit: cover;
}
.upload-container {
  display: flex;
}
</style>
