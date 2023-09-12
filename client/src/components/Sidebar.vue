<template>
<div>
  <ul id="custom-sidebar">
    <router-link class="common-link" :to="{ name: 'Home' }"><li>Home</li></router-link>
    <router-link class="common-link" :to="{ name: 'NewBankTransact' }"><li>New Bank Transaction</li></router-link>
    <router-link class="common-link" :to="{ name: 'NewCreditCardTransact' }"><li>New Credit Card Transaction</li></router-link>
    <router-link class="common-link" :to="{ name: 'NewGCashTransact' }"><li>New GCash Transaction</li></router-link>
    <router-link class="common-link" :to="{ name: 'NewMayaTransact' }"><li>New Maya Transaction</li></router-link>
    <router-link class="common-link" :to="{ name: 'NewLazadaTransact' }"><li>New Lazada Transaction</li></router-link>
    <router-link class="common-link" :to="{ name: 'TransactsList'}"><li>View Records</li></router-link>
  </ul>
</div>
</template>

<script>

export default {

}
</script>

<style scoped>

.common-link {
  color: #fff;
  text-decoration: none;
}

.common-link:hover {
  color: #fff;
}

.common-link:active {
  color: orange;
}

#custom-sidebar {
  margin-left: 1.5rem;
}

#custom-sidebar li:hover {
  background-color: var(--blue-highlight);
}

#custom-sidebar li {
  padding: 1rem;
  list-style-type: none;
  background-color: var(--item-color);
  border-radius: 0.44rem;
  margin-bottom: 0.5rem;
}

@media screen and (max-width: 700px) {
  /* ul {
    margin-left: 0;
  }

  li {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  } */

  #custom-sidebar {
    display: none;
  }
}

</style>