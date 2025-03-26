import Layout from '@/layout'


export default {
  path: '/admin',
  name: 'Admin',
  component: Layout,
  meta: { title: '网站管理', icon: 'el-icon-s-home' },
  children: [
    {
    path: '/bonusPointManage',
    name: 'BonusPointManage',
    component: () => import('@/views/admin/user-manage/index.vue'),
    meta: { title: 'asd加分申请管理', icon: 'el-icon-s-home', roles: ['管理员'] },
  }, {
    path: '/classMange',
    name: 'ClassMange',
    component: () => import('@/views/admin/user-manage/index.vue'),
    meta: { title: '教室管理', icon: 'el-icon-s-home' },
  }, {
    path: '/CollegeManage',
    name: 'CollegeManage',
    component: () => import('@/views/admin/college-manage/index.vue'),
    meta: { title: '学院管理', icon: 'el-icon-s-home' },
  }, {
    path: '/courseManage',
    name: 'CourseManage',
    component: () => import('@/views/admin/user-manage/index.vue'),
    meta: { title: '课程管理', icon: 'el-icon-s-home' },
  }, {
    path: '/siteManage',
    name: 'SiteManage',
    component: () => import('@/views/admin/user-manage/index.vue'),
    meta: { title: '站点管理', icon: 'el-icon-s-home' },
  }, {
    path: '/userManage',
    name: 'UserManage',
    component: () => import('@/views/admin/user-manage/index.vue'),
    meta: { title: '用户管理', icon: 'el-icon-s-home' },
  }, {
    path: '/scoreManage',
    name: 'ScoreManage',
    component: () => import('@/views/admin/score-manage/index.vue'),
    meta: { title: '成绩管理', icon: 'el-icon-s-home' },
  },
  
],
}