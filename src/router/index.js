import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

const Admin = () => import('@/components/Admin.vue')
const Main = () => import('@/components/Main.vue')
const AddArticle = () => import('@/components/AddArticle.vue')

Vue.use(Router)
Vue.use(Resource)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/addArticle',
      name: 'AddArticle',
      component: AddArticle
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
