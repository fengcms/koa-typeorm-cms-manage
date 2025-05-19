import { getInfo, getRsaKey, login, logout } from '@/api/user'
import { resetRouter } from '@/router'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { SHA256, rsaEncrypt } from '@/utils/crypto'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    role: 'editor',
    editor: 'MARKDOWN',
    rsaKey: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_OTHER: (state, { role, editor }) => {
    state.role = role
    state.editor = editor
  },
  SET_RSA_KEY: (state, rsaKey) => {
    state.rsaKey = rsaKey
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password, role } = userInfo
    return new Promise((resolve, reject) => {
      // 首先读取 rsa 公钥
      getRsaKey()
        .then(async (r) => {
          const key = r.data
          commit('SET_RSA_KEY', key)
          const hashPw = await SHA256(password)
          // 使用 rsa 公钥加密密码
          const enPw = await rsaEncrypt(key, hashPw)
          // 提交登录接口
          login({ account: account.trim(), password: enPw, role })
            .then((response) => {
              const { data } = response
              commit('SET_TOKEN', `Bearer ${data.token}`)
              setToken(`Bearer ${data.token}`)
              resolve()
            })
            .catch((error) => {
              reject(error)
            })
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then((response) => {
          const { data } = response

          if (!data) {
            reject('校验失败，请重新登录！')
          }

          const { name, account, avatar, role, editor } = data
          commit('SET_NAME', name || account)
          commit('SET_AVATAR', avatar || '/image/manage-ico.jpg')
          commit('SET_OTHER', { role, editor })
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
      // logout(state.token)
      //   .then(() => {
      //     removeToken() // must remove  token  first
      //     resetRouter()
      //     commit('RESET_STATE')
      //     resolve()
      //   })
      //   .catch((error) => {
      //     reject(error)
      //   })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken() // must remove  token  first
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
