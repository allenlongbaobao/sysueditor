import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

const Admin = () => import('@/components/Admin.vue')
const Main = () => import('@/components/Main.vue')
const AddArticle = () => import('@/components/AddArticle.vue')
const Home = () => import('@/components/Home.vue')
const UserPage = () => import('@/components/UserPage.vue')
const Article = () => import('@/components/Article.vue')

Vue.use(Router)
Vue.use(Resource)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: UserPage
      },
      {
        path: 'article/',
        component: Article
      }]
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
