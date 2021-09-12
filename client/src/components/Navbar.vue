<template>
  <div class="navbar custom-navbar">
      <nav>
        <div class="nav-flex">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chart-infographic" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <circle cx="7" cy="7" r="4" />
            <path d="M7 3v4h4" />
            <line x1="9" y1="17" x2="9" y2="21" />
            <line x1="17" y1="14" x2="17" y2="21" />
            <line x1="13" y1="13" x2="13" y2="21" />
            <line x1="21" y1="12" x2="21" y2="21" />
          </svg>
          <h1>
            <router-link :to="{ name: 'Home' }">GCash&nbsp;&#38;&nbsp;Savings Account</router-link>
          </h1>
        </div>
        <div class="links" :class="{'open': isAddClass}">
          <ul class="nav-links">
            <li class="li-link" @click="closeBurger"><router-link class="common-link" :to="{ name: 'Home' }">Dashboard</router-link></li>
            <li class="li-link" @click="closeBurger"><router-link class="common-link" :to="{ name: 'NewBankTransact' }">New Bank Transaction</router-link></li>
            <li class="li-link" @click="closeBurger"><router-link class="common-link" :to="{ name: 'NewGCashTransact' }">New GCash Transaction</router-link></li>
            <li class="li-link" @click="closeBurger"><router-link class="common-link" :to="{ name: 'TransactsList' }">View Records</router-link></li>
          </ul>
        </div>
        <div class="hamburger" @click="hamburgerClick">
          <div class="burger-line" :class="{'slash-1': isAddClass}"></div>
          <div class="burger-line" :class="{'slash-2': isAddClass}"></div>
          <div class="burger-line" :class="{'hide': isAddClass}"></div>
        </div>
      </nav>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  emits: ["stop-scroll"],
  setup(props, { emit }) {
    const isAddClass = ref(false)

    const hamburgerClick = () => {
      isAddClass.value = !isAddClass.value
      emit('stop-scroll', isAddClass.value)
    }

    const closeBurger = () => {
      isAddClass.value = false;
      emit('stop-scroll', false )
    }

    return { isAddClass, hamburgerClick, closeBurger }
  }
}
</script>

<style scoped>
  .custom-navbar {
    position: static;
  }

  .nav-flex {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  nav a {
    text-decoration: none;
  }

  nav a:hover {
    color: #000;
  }

  h1::after {
    content: '\ATracking System';
    white-space: pre;
    font-size: 0.9rem;
    position: absolute;
    left: 11.4rem;
    top: 2rem;
  }

  .links {
    margin-left: auto;
    /* background-color: palegreen; */
  }

  .nav-links {
    display: none;
    position: absolute;
    bottom: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-links li {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 1rem;
  }

  .li-link {
    padding: 0.5rem 0.5rem;
  }

  .li-link:hover::before {
    content: '\01F8A3 ';
    color: orange;
  }

  .li-link:hover::after {
    content: ' \01F8A2';
    color: orange;
  }

  nav .links, nav .hamburger {
    isolation: auto;
    z-index: 0;
  }

@media screen and (max-width: 700px) {
  
  .burger-line {
    width: 1.5rem;
    height: 3px;
    background-color: #fff;
    margin: 5px;
    transition: 0.2s transform ease-out, 0.2s opacity ease-out;
  }

  .burger-line.slash-1 {
    transform: rotate(45deg) translate(25%, 190%);
  }

  .burger-line.slash-2 {
    transform: rotate(-45deg);
  }

  .burger-line.hide {
    opacity: 0;
  }

  /* nav {
    position: relative; 
  } */

  .hamburger {
    cursor: pointer;
    position: absolute;
    top: 1rem;
    right: 0.5rem;
    border: 1px solid white;
    border-radius: 5px;
    padding: 0.5rem;
    margin-right: 0.5rem;
  }

  nav .links, nav .hamburger {
    isolation: auto;
    z-index: 1;
  }

  nav .links {
    margin-left: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    clip-path: circle(30px at 100% 2%);
    -webkit-clip-path: circle(30px at 100% 2%);
    transition: 1s background-color ease-in-out, 1s clip-path ease-out;
  }

  nav .links.open{
    background-color: #353230;
    clip-path: circle(90vh at 100% 0%);
    -webkit-clip-path: circle(90vh at 100% 0%);
  }

  .nav-links {
    display: inline-block;
    padding: 0;
    margin: 0;
    flex-direction: column;
    position: absolute;
    bottom: 50vh;
    width: 100%;
  }

  .nav-links li {
    font-size: 1.5rem;
    color: #fff;
    margin-left: 0;
    height: 10vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .li-link:hover {
    color: #fff;
  }

  .common-link {
    text-decoration: none;
  }

  .common-link:hover {
      color: #fff;
  }

}
</style>