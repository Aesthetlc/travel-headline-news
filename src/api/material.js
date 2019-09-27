// 素材
import axios from '../utils/axios.config'
import API from '../constant/api'

// 取消和收藏的方法
export function collectAndNoCollect (item) {
  return axios({
    url: `${API.API_USERIMAGE}/${item.id}`,
    method: 'put',
    data: {
      collect: !item.is_collected
    }
  })
}
// 删除素材的方法
export function delImg (id) {
  return axios({
    url: `${API.API_USERIMAGE}/${id}`,
    method: 'delete'
  })
}

// 上传图片的方法
export function uploadImg (data) {
  return axios({
    url: '/user/images',
    method: 'post',
    data
  })
}

// 获取素材的方法
export function getImg (pages, activeName) {
  return axios({
    url: '/user/images',
    params: {
      collect: activeName === 'collect',
      page: pages.page,
      per_page: pages.per_page
    }
  })
}
