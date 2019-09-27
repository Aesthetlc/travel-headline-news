// 发布信息
import axios from '../utils/axios.config'
import API from '../constant/api'

// 获取从文章列表传过来的详细文章信息
export function getPublishById (articleId) {
  return axios({
    url: `${API.API_ARTICLES}/${articleId}`
  })
}

// 发布文章
export function publishArticle (articleId, draft, formData) {
  return axios({
    url: articleId ? `${API.API_ARTICLES}/${articleId}` : `${API.API_ARTICLES}`,
    method: articleId ? 'PUT' : 'POST',
    params: { draft }, // （true 为草稿）（false为发布）
    data: formData
  })
}
