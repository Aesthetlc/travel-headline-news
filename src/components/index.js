// 声明一个全局的组件，来进行整理
import layoutAside from '../components/home/layout-aside'
import layoutHeader from '../components/home/layout-header'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
  }
}
