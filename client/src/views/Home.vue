<template>
  <div class="home">
    <TransactsList />
  </div>
</template>

<script>
// @ is an alias to /src
import TransactsList from '../components/TransactsList'

export default {
  name: 'Home',
  components: {
    TransactsList
  }
}
</script>
