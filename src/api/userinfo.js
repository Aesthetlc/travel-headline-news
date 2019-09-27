// 个人信息
import axios from '../utils/axios.config'
import API from '../constant/api'

// 1.获取用户信息
export function getUserInfo () {
  return axios({
    url: API.API_USERPROFILE
  })
}
// 2.编辑用户信息
export function editUserInfo (formData) {
  return axios({
    url: API.API_USERPROFILE,
    method: 'PATCH',
    data: formData
  })
}
// 3.上传用户头像信息
export function uploadImg (data) {
  return axios({
    url: '/user/photo',
    method: 'PATCH',
    data
  })
}
