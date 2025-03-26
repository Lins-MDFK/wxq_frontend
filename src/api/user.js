import request from '@/utils/request'

// 封装登录请求
export function login(data) {
  return request({
    url: 'http://localhost:8080/login',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

// 封装注册请求
export function register(data) {
  return request({
    url: 'http://localhost:8080/register',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:8080/userinfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

//获取用户列表
export function getUserList(data) {
  return request({
    url: 'http://localhost:8080/getUserList',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

//获取所有学生成绩信息
export function getScore(data) {
  return request({
    url: 'http://localhost:8080/getScore',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data'},
    data
  })
}

//修改密码
export function getChangePassword(data) {
  return request({
    url: 'http://localhost:8080/changePassword',
    method: 'post',
    headers: { 'Content-Type': 'application/form-data' }, // 修改为表单数据
    data
  })
}

//获取学院接口
export function getCollegeList(data) {
  return request({
    url: 'http://localhost:8080/admin/getCollegeList',
    method: 'post',
    headers: { 'Content-Type': 'application/form-data' }, // 修改为表单数据
    data
  })
}

