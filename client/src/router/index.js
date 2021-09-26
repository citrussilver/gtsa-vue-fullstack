import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import SignUp from '../views/auth/SignUp.vue'
import NewBankTransact from '../views/NewBankTransact.vue'
import NewCreditCardTransact from '../views/NewCreditCardTransact.vue'
import NewGCashTransact from '../views/NewGCashTransact.vue'
import TransactsList from '../views/TransactsList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/new-sa-tr',
    name: 'NewBankTransact',
    component: NewBankTransact
  },
  {
    path: '/new-cc-tr',
    name: 'NewCreditCardTransact',
    component: NewCreditCardTransact
  },
  {
    path: '/new-gcash-tr',
    name: 'NewGCashTransact',
    component: NewGCashTransact
  },
  {
    path: '/view-recs',
    name: 'TransactsList',
    component: TransactsList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
