import Vue from 'vue'
import Router from 'vue-router'

const Admin = () => import('@/components/Admin.vue')
const Main = () => import('@/components/Main.vue')
const addArticle = () => import('@/components/addArticle.vue')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/addArticle',
      name: 'addArticle',
      component: addArticle
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
