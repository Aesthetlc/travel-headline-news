// 声明一个全局的组件，来进行整理
import layoutAside from '../components/home/layout-aside'
import layoutHeader from '../components/home/layout-header'
import breadCrumb from '../components/common/bread-crumb'
import coverImage from '../components/publish/cover-image'
import selectImage from '../components/publish/select-image'
// 实现整体组件的统一注册
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)// 全局注册左侧导航
    Vue.component('layout-header', layoutHeader)// 全局注册头部组件
    Vue.component('bread-crumb', breadCrumb)// 全局注册面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑
    Vue.component('cover-image', coverImage) // 全局注册发表文章图层1
    Vue.component('select-image', selectImage) // 全局注册选择素材
  }
}
