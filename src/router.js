import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home'
import Login from './views/login'
import Main from './views/home/main'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
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
