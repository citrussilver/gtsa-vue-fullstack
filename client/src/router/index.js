import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import SignUp from '../views/auth/SignUp.vue'
import NewBankTransact from '../views/NewBankTransact.vue'
import NewCreditCardTransact from '../views/NewCreditCardTransact.vue'
import NewGCashTransact from '../views/NewGCashTransact.vue'
import NewMayaTransact from '../views/NewMayaTransact.vue'
import NewLazadaTransact from '../views/NewLazadaTransact.vue'
import TransactsList from '../views/TransactsList.vue'

import { computed } from 'vue'
import { useStore } from 'vuex'

const requireAuth = (to, from, next) => {
  // let user = projectAuth.currentUser
  const user = computed(() => store.state.user)

  console.log(user)

  if(!user) {
    next({ name: 'Login'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    component: NewBankTransact,
  },
  {
    path: '/new-cc-tr',
    name: 'NewCreditCardTransact',
    component: NewCreditCardTransact,
  },
  {
    path: '/new-gcash-tr',
    name: 'NewGCashTransact',
    component: NewGCashTransact,
  },
  {
    path: '/new-maya-tr',
    name: 'NewMayaTransact',
    component: NewMayaTransact,
  },
  {
    path: '/new-lzd-tr',
    name: 'NewLazadaTransact',
    component: NewLazadaTransact,
  },
  {
    path: '/view-recs',
    name: 'TransactsList',
    component: TransactsList,
  }
]

const router = createRouter({
  base: '/gtsa',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
