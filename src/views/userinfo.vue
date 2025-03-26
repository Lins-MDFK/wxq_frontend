<template>
    <div class="user-center">
      <!-- 基本信息 -->
      <el-card class="info-card">
        <h2 class="card-title">个人中心</h2>
        <el-row>
          <el-col :span="6">
            <el-image
              :src="userInfo.avatar"
              :preview-src-list="[userInfo.avatar]"
              class="avatar"
            />
            <el-button type="primary" @click="openUploadDialog">更换头像</el-button>
          </el-col>
          <el-col :span="18">
            <el-form :model="userInfo" label-width="100px">
              <el-form-item label="用户名">
                <span>{{ userInfo.username }}</span>
              </el-form-item>
              <el-form-item label="邮箱">
                <span>{{ userInfo.email }}</span>
              </el-form-item>
              <el-form-item label="手机号">
                <span>{{ userInfo.phone }}</span>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-card>
  
      <!-- 修改密码 -->
      <el-card class="password-card">
        <h2 class="card-title">修改密码</h2>
        <el-form :model="passwordForm" :rules="passwordRules" label-width="100px">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="passwordForm.oldPassword" />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="passwordForm.newPassword" />
          </el-form-item>
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input type="password" v-model="passwordForm.confirmPassword" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePassword">提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  
      <!-- 头像上传对话框 -->
      <el-dialog
        :visible.sync="isUploadDialogVisible"
        title="更换头像"
      >
        <el-upload
          action="/your-upload-url"
          :show-file-list="false"
          :on-success="handleAvatarUploadSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button type="primary">选择文件</el-button>
        </el-upload>
      </el-dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // 用户基本信息
        userInfo: {
          username: 'John Doe',
          email: 'johndoe@example.com',
          phone: '1234567890',
          avatar: 'https://example.com/default-avatar.jpg' // 替换为默认头像链接
        },
        // 修改密码表单数据
        passwordForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        },
        // 修改密码表单验证规则
        passwordRules: {
          oldPassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, message: '新密码长度不能少于6位', trigger: 'blur' }
          ],
          confirmPassword: [
            { required: true, message: '请确认新密码', trigger: 'blur' },
            { validator: this.validatePasswordMatch, trigger: 'blur' }
          ]
        },
        // 头像上传对话框显示状态
        isUploadDialogVisible: false
      };
    },
    methods: {
      // 打开头像上传对话框
      openUploadDialog() {
        this.isUploadDialogVisible = true;
      },
      // 上传头像前的处理函数，可用于限制文件类型等
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          this.$message.error('上传头像只能是 JPG 格式!');
        }
        return isJPG;
      },
      // 头像上传成功后的处理函数
      handleAvatarUploadSuccess(response, file) {
        this.userInfo.avatar = response.url; // 假设接口返回的响应中有头像的新链接
        this.isUploadDialogVisible = false;
        this.$message.success('头像更换成功');
      },
      // 验证新密码和确认新密码是否一致
      validatePasswordMatch(rule, value, callback) {
        if (value!== this.passwordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'));
        } else {
          callback();
        }
      },
      // 修改密码函数
      changePassword() {
        // 这里可以添加调用后台接口修改密码的逻辑
        this.$message.success('密码修改成功');
        // 清空表单数据
        this.passwordForm.oldPassword = '';
        this.passwordForm.newPassword = '';
        this.passwordForm.confirmPassword = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .user-center {
    padding: 20px;
  }
  
  .info-card {
    margin-bottom: 20px;
  }
  
  .card-title {
    margin-bottom: 10px;
    font-size: 20px;
  }
  
  .avatar {
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
  }
  
  .password-card {
    background-color: #f9f9f9;
  }
  </style>
  