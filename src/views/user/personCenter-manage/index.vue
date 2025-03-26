<script>
import fi from 'element-ui/src/locale/lang/fi'

export default {
  name: 'Index',
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      imageUrl: '',
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
        const base64 = e.target.result

        _this.uploadFileBase64 = base64
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
  <div class="page-container">
    <el-card>
      <div slot="header" class="header">个人中心</div>
      <div class="card-container">
        <div class="">
          <div style="padding: 0px 0px;">
            <h4>修改信息</h4>
          </div>
          <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">
            <el-form-item label="头像">
              <div class="upload-container">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                  :on-change="handleChange"
                >
                  <img v-if="uploadFileBase64" :src="uploadFileBase64" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" />
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formLabelAlign.region" />
            </el-form-item>
            <el-form-item label="学院">
              <el-input v-model="formLabelAlign.type" />
            </el-form-item>
            <el-form-item label="专业">
              <el-input v-model="formLabelAlign.type" />
            </el-form-item>
          </el-form>
        </div>
        <el-divider />
        <div class="div" style="width: 400px;">
          <div style="padding: 0px 0px;">
            <h4>修改密码</h4>
          </div>
          <el-form :label-position="labelPosition" label-width="100px" :model="formLabelAlign">

            <el-form-item label="旧密码">
              <el-input v-model="formLabelAlign.region" />
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="formLabelAlign.type" />
            </el-form-item>
            <el-form-item label="重复新密码">
              <el-input v-model="formLabelAlign.type" />
            </el-form-item>
            <el-form-item label="">
              <el-button type="primary"> 确认修改</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
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
  border-color: #409EFF;
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
