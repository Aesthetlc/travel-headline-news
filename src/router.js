import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  // 一级路由404配置
  {
    path: '*',
    component: () => import('./views/404')
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '',
      component: Main
    },
    // 实现按需加载(评论详情)
    {
      path: 'comment',
      component: () => import('./views/comment')
    },
    // 实现按需加载(素材管理)
    {
      path: 'material',
      component: () => import('./views/material')
    },
    // 实现按需加载(内容列表)
    {
      path: 'articles',
      component: () => import('./views/articles')
    },
    // 实现按需加载(发布文章)
    {
      path: 'publish',
      component: () => import('./views/publish')
    },
    // 实现按需加载(修改文章)
    {
      path: 'publish/:articleId',
      component: () => import('./views/publish')
    },
    // 实现按需加载(个人信息)
    {
      path: 'userinfo',
      component: () => import('./views/userinfo')
    },
    // 实现按需加载(图文加载)
    {
      path: 'grapdata',
      component: () => import('./views/fans/grapdata')
    },
    // 404二级路由配置
    {
      path: '*',
      component: () => import('./views/404')
    }
    ]
  }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
