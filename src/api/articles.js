// 文章信息
import axios from '../utils/axios.config'
import API from '../constant/api'

// 删除文章
export function delMsg (id) {
  return axios({
    url: `${API.API_ARTICLES}/${id.toString()}`,
    method: 'delete'
  })
}
// 查询频道
export function getChannelMsg () {
  return axios({
    url: API.API_CHANNELS
  })
}
// 获取文章总数
export function getArticles (params) {
  return axios({
    url: API.API_ARTICLES,
    params
  })
}
