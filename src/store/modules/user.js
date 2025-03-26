import { login, logout, getInfo, register } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    satoken: getToken(),
    name: '',
    avatar: '',
    roles: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, satoken) => {
    state.satoken = satoken
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE: (state, roles) => {
    state.roles = roles
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户注册
  register({ commit }, userInfo) {
    const { userid, username, password, confirmPassword } = userInfo // 前端传递过来的用户信息包含这些字段

    const formdata = new FormData()
    formdata.append('userid', userid.trim())
    formdata.append('username', username.trim())
    formdata.append('password', password.trim())
    formdata.append('confirmPassword', confirmPassword.trim())

    return new Promise((resolve, reject) => {
      register(formdata)
        .then((response) => {
          console.log(response)
          // 如果注册成功，处理返回的 token 等信息
          // 这里假设返回的结构中有 tokenValue 字段
          commit('SET_TOKEN', response.tokenValue)
          setToken(response.tokenValue)
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  // 用户登录
  login({ commit }, userInfo) {
    const { userid, password } = userInfo

    const formdata = new FormData()

    formdata.append('userid', userid.trim())
    formdata.append('password', password.trim())

    return new Promise((resolve, reject) => {
      login(formdata)
        .then((response) => {
          console.log(response)
          const { userInfo } = response

          console.log(userInfo)
          if (!userInfo) {
            return reject('Verification failed, please Login again.')
          }
          const { name, avatar, role } = userInfo

          console.log(userInfo)

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          commit('SET_TOKEN', response.tokenValue)
          commit('SET_ROLE', role)
          setToken(response.satoken)
          resolve()
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.satoken)
        .then((response) => {
          const { userInfo } = response

          console.log(userInfo)
          if (!userInfo) {
            return reject('Verification failed, please Login again.')
          }
          const { name, avatar } = userInfo

          console.log(userInfo)

          commit('SET_NAME', name)
          commit('SET_AVATAR', avatar)
          resolve(data)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  },

  // 用户登出
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.satoken).then(() => {
      //   removeToken() // must remove  satoken  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   console.log(error)
      //   reject(error)
      // })

      removeToken() // must remove  satoken  first
      resetRouter()
      commit('RESET_STATE')
      location.href = '/'
    })
  },

  // remove satoken
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  satoken  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
