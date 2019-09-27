// 评论信息
import axios from '../utils/axios.config'
import API from '../constant/api'

// 获取评论数据
export function getComment (pages) {
  return axios({
    url: API.API_ARTICLES,
    params: {
      response_type: 'comment',
      page: pages.page,
      per_page: pages.per_page
    }
  })
}
// 修改文章评论状态
export function changeComment (row) {
  return axios({
    url: API.API_COMMENTSSTATUS,
    method: 'put',
    params: { article_id: row.id.toString() },
    data: {
      allow_comment: !row.comment_status
    }
  })
}
