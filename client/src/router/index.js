import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NewBankTransact from '../views/NewBankTransact.vue'
import NewGCashTransact from '../views/NewGCashTransact.vue'
import TransactsList from '../views/TransactsList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/new-sa-tr',
    name: 'NewBankTransact',
    component: NewBankTransact
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
