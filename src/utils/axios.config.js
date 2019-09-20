// 给所有的请求携带token
import axios from 'axios'
// 设置baseURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'

// 请求拦截
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
},
function (error) {
  return Promise.reject(error)
})

// 响应处理数据
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  return Promise.reject(error)
})

export default axios
