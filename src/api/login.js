// 存放登录的方法
import axios from '../utils/axios.config'
import API from '../constant/api'

export function loginForm (formData) {
  return axios({
    url: API.API_AUTHORIZATIONS,
    method: 'post',
    data: formData
  })
}
