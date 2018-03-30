import Vue from 'vue'
import Router from 'vue-router'

const Admin = () => import('@/components/Admin.vue')
const Main = () => import('@/components/Admin.vue')
const Editor = () => import('@/components/Editor.vue')

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/editor',
      name: 'Editor',
      component: Editor
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    }
  ]
})
