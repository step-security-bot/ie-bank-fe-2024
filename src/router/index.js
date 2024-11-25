import Vue from 'vue'
import VueRouter from 'vue-router'
import Skull from '../components/Skull.vue'
import AppAccounts from '../components/AppAccounts.vue'
import AdminLogin from "../components/LoginPage.vue"
import AdminPortal from "../components/AdminPortal.vue";
import LoginPage from "@/components/LoginPage.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/skull',
    name: 'Skull',
    component: Skull
  },
  {
    path: '/accounts',
    name: 'AppAccounts',
    component: AppAccounts
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/users',
    name: 'UserManagement',
    component: AdminPortal
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
