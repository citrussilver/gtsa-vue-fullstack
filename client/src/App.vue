<template>
  <div>
    <BasicLayout>
      <router-view/>
    </BasicLayout>
  </div>
</template>

<script>
import BasicLayout from './components/layouts/Basic.vue'

export default {
  components: {
    BasicLayout
  }
}
</script>

<style>
</style>