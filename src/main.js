import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import Component from './components'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
// 引用axios
import axios from './utils/axios.config'

// 给全局设置axios
Vue.prototype.$http = axios

Vue.use(ElementUI)
Vue.use(Component)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
