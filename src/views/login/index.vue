<template>
  <div class="container">
    <div class="container-blur"></div>
    <!-- 左边信息区 -->
    <div class="container-left">
      <div class="container-left-foot">
        <div>comprehensive quality evaluate system for college student</div>
        <div>赣ICP备17010490号-1</div>
      </div>
    </div>
    <!-- 右边表单区域 -->
    <div class="container-right">
      <el-form
        ref="registerForm"
        :rules="registerRules"
        class="container-right-form"
        :model="registerForm"
        v-if="isRegister"
      >
        <el-form-item prop="userid">
          <el-input
            prefix-icon="el-icon-user"
            maxlength="20"
            placeholder="注册学号"
            v-model="registerForm.userid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            prefix-icon="el-icon-user"
            maxlength="20"
            placeholder="注册姓名"
            v-model="registerForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            maxlength="50"
            :show-password="registerPasswordType!=='password'"
            placeholder="注册密码"
            v-model="registerForm.password"
            @keyup.enter.native="handleRegister"
          ></el-input>
          <span class="show-pwd" @click="showRegisterPwd">
            <i :class="registerPasswordType === 'password'? 'el-icon-eye' : 'el-icon-eye-open'"></i>
          </span>
        </el-form-item>
        <el-form-item prop="confirmPassword">
          <el-input
            prefix-icon="el-icon-lock"
            maxlength="50"
            :show-password="confirmPasswordType!=='password'"
            placeholder="确认密码"
            v-model="registerForm.confirmPassword"
            @keyup.enter.native="handleRegister"
          ></el-input>
          <span class="show-pwd" @click="showConfirmPwd">
            <i :class="confirmPasswordType === 'password'? 'el-icon-eye' : 'el-icon-eye-open'"></i>
          </span>
        </el-form-item>
        <!-- <el-form-item prop="role" >
          <el-radio-group  v-model="registerForm.role" >
            <el-radio label="student">学生</el-radio>
            <el-radio label="teacher">教师</el-radio>
          </el-radio-group>
        </el-form-item> -->
        <el-form-item style="margin-bottom: 0">
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%"
            @click="handleRegister"
          >注册</el-button>
        </el-form-item>
        <div class="switch-login">
          已有账号？<el-link :underline="false" @click="switchToLogin">点击登录</el-link>
        </div>
      </el-form>
      <el-form
        ref="loginForm"
        :rules="loginRules"
        class="container-right-form"
        :model="loginForm"
        v-else
      >
        <el-form-item prop="userid">
          <el-input
            prefix-icon="el-icon-user"
            maxlength="20"
            placeholder="学号"
            v-model="loginForm.userid"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            maxlength="50"
            :show-password="passwordType!=='password'"
            placeholder="密码"
            v-model="loginForm.password"
            @keyup.enter.native="handleLogin"
          ></el-input>
          <span class="show-pwd" @click="showPwd">
            <i :class="passwordType === 'password'? 'el-icon-eye' : 'el-icon-eye-open'"></i>
          </span>
        </el-form-item>
        <el-form-item style="margin-bottom: 0">
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%"
            @click="handleLogin"
          >登录</el-button>
        </el-form-item>
        <div class="container-right-form-btns">
          <div><el-checkbox v-model="isRememberPwd">记住密码</el-checkbox></div>
          <div><el-tooltip effect="dark" content="请联系学校管理员重置密码" placement="bottom-end"><el-link :underline="false">忘记密码</el-link></el-tooltip></div>
        </div>
        <div style="margin-top:10px;font-size:12px;color:#999999;">建议使用谷歌浏览器、火狐浏览器或者高版本的其他浏览器</div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user';

export default {
  name: 'Login',
  data() {
    const validateUserId= (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入学号'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位'));
      } else {
        callback();
      }
    };
    const validateRegisterUserId = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入注册学号'));
      } else {
        callback();
      }
    };
    const validateRegisterUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入注册姓名'));
      } else {
        callback();
      }
    };
    const validateRegisterPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入注册密码'));
      } else if (value.length < 6) {
        callback(new Error('注册密码长度不能少于6位'));
      } else {
        callback();
      }
    };
    const validateConfirmPassword = (rule, value, callback) => {
      if (value!== this.registerForm.password) {
        callback(new Error('两次输入的密码不一致'));
      } else {
        callback();
      }
    };
    // const validateRole = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请选择用户角色'));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      loginForm: {
        userid: '21045407',
        password: 'testtest'
      },
      registerForm: {
        userid: 'test1',
        username: '王晓琴',
        password: 'testtest',
        confirmPassword: 'testtest',
        role: ''
      },
      loginRules: {
        userid: [
          { required: true, trigger: 'blur', validator: validateUserId}
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      registerRules: {
        userid: [
          { required: true, trigger: 'blur', validator: validateRegisterUserId }
        ],
        username: [
          { required: true, trigger: 'blur', validator: validateRegisterUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validateRegisterPassword }
        ],
        confirmPassword: [
          { required: true, trigger: 'blur', validator: validateConfirmPassword }
        ],
        // role: [
        //   { required: true, trigger: 'change', validator: validateRole }
        // ]
      },
      loading: false,
      passwordType: 'password',
      registerPasswordType: 'password',
      confirmPasswordType: 'password',
      redirect: '',
      isRememberPwd: false,
      isRegister: true
    };
  },
  watch: {
    $route: {
      handler(newRoute) {
        this.redirect = newRoute.query && newRoute.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password'? '' : 'password';
      this.$nextTick(() => {
        this.$refs.loginForm.$refs.password.focus();
      });
    },
    showRegisterPwd() {
      this.registerPasswordType = this.registerPasswordType === 'password'? '' : 'password';
      this.$nextTick(() => {
        this.$refs.registerForm.$refs.password.focus();
      });
    },
    showConfirmPwd() {
      this.confirmPasswordType = this.confirmPasswordType === 'password'? '' : 'password';
      this.$nextTick(() => {
        this.$refs.registerForm.$refs.confirmPassword.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            console.log('登录成功')
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.registerForm).then(() => {
            console.log('注册成功')
            this.isRegister = false
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    switchToLogin() {
      this.isRegister = false
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../../assets/images/bg.jpg") fixed;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  display: flex;
  z-index: 0;
 .container-blur {
    position: absolute;
    width: 700px;
    height: 100%;
    top: 0;
    right: 0;
    filter: blur(4px);
    background: inherit;
    z-index: 0;
  }
}
.container-left {
  position: relative;
  flex: 1;
  color: #fff;
 .container-left-foot {
    border-top: 1px solid #fff;
    position: absolute;
    padding-top: 4px;
    left: 50px;
    bottom: 30px;
    font-size: 10px;
  }
}
.container-right {
  width: 700px;
  height: 100%;
  min-width: 700px;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
 .container-right-form {
    background-color: #fff;
    width: 400px;
    padding: 20px 20px;
   .container-right-form-btns {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 4px;
    }
   .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: #889aa4;
      cursor: pointer;
      user-select: none;
    }
  }
 .switch-login {
    text-align: center;
    margin-top: 10px;
    color: #333;
    cursor: pointer;
  }
}
</style>
