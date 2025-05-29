import store from '@/store'
import { getToken } from '@/utils/auth'
import { filterNull } from '@/utils/tools'
import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// create an axios instance
const service = axios.create({
  baseURL: '/api/v1', // url = base url + request url
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers.Authorization = getToken()
    }
    config.data = filterNull(config.data)
    config.params = filterNull(config.params)

    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    // 如果是文件下载，直接返回 response
    if (response.config.responseType === 'blob') {
      return Promise.resolve(response)
    }

    const res = response.data
    if (response.status !== 200 || res.status !== 0) {
      Message({
        message: res.msg || res.data || 'Error',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(new Error(res.msg || res.data || 'Error'))
    }
    return Promise.resolve(res)
  },
  (error) => {
    console.log(`err ${error}`)
    const { response } = error
    const { data, status } = response
    if (status === 401) {
      MessageBox.confirm('登录超时，请重新登录！', '提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
      return Promise.reject(error)
    }
    Message({
      message: data.msg || error.message || 'Error',
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
