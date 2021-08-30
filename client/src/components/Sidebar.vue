<template>
  <ul>
    <router-link :to="{ name: 'Home' }"><li>Home</li></router-link>
    <router-link :to="{ name: 'NewBankTransact' }"><li>New Bank Transaction</li></router-link>
    <router-link :to="{ name: 'NewGCashTransact' }"><li>New GCash Transaction</li></router-link>
  </ul>
</template>

<script>
export default {

}
</script>

<style scoped>
ul {
  padding-left: 1.5rem;
}
</style>