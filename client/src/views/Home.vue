<template>
  <div class="home">
    <Dashboard />
  </div>
</template>

<script>
// @ is an alias to /src
import Dashboard from '../components/Dashboard.vue'

export default {
  name: 'Home',
  components: {
    Dashboard
  }
}
</script>
<style scoped>
.home {
  margin-right: 1rem;
  min-height: 100%;
}

@media all and (max-width: 700px) {
  .home {
    margin-right: 0;
  }
}
</style>
