import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/listview',
    name: 'listview',
    component: () => import(/* webpackChunkName: "about" */ '../views/ListView.vue')
  },
  {
    path: '/searchview',
    name: 'searchview',
    component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/me',
    name: 'me',
    // 判断是否登录
    beforeEnter: (to, from, next) => {
      if(store.state.user.isLogin){
        next()
      }else{
        next('/login')
      }
      
      
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Me.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
