import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import login from '../views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: () => import('@/views/Home/home')
      },
      {
        path: 'publish',
        component: () => import('@/views/publish')
      },
      {
        path: 'content',
        component: () => import('../views/content')
      },
      {
        path: 'comment',
        component: () => import('@/views/comment')
      },
      {
        path: 'material',
        component: () => import('@/views/material')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
