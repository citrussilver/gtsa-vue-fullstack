<template>
  <div>
    <BasicLayout>
      <router-view/>
    </BasicLayout>
  </div>
  <DialogWrapper />
</template>

<script>
import BasicLayout from './components/layouts/Basic.vue'
import { DialogWrapper } from 'vue3-promise-dialog'

export default {
  components: {
    BasicLayout,
    DialogWrapper,
  }
}
</script>

<style>
</style>