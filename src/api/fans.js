// 粉丝列表
import axios from './../utils/axios.config'
import API from '../constant/api'

export function getFans (pages) {
  return axios({
    url: API.API_FOLLOWERS,
    params: {
      page: pages.currentPage,
      per_page: pages.perSize
    }
  })
}
