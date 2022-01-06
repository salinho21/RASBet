import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import AccountDetails from '../views/AccountDetails.vue'
import Authentication from '../views/Authentication.vue'
import BettingPage from '../views/BettingPage.vue'
import Historico from '../views/Historico.vue'
import Movements from '../views/Movements.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication
  },
  {
    path: '/betting',
    name: 'BettingPage',
    component: BettingPage
  },
  {
    path: '/detalhes',
    name: 'AccountDetails',
    component: AccountDetails
  },
  {
    path: '/historico',
    name: 'Historico',
    component: Historico
  },
  {
    path: '/movimentos',
    name: 'Movements',
    component: Movements
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
