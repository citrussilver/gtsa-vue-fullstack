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

router-link {
    text-decoration: none;
}

ul {
  margin-left: 1.5rem;
}

@media all and (max-width: 700px) {
  ul {
    margin-left: 0;
  }
}

</style>