<template>
  <div>
    <!-- <Navbar />
    <Sidebar />
    <router-view/> -->
    <BasicLayout>
      <router-view/>
    </BasicLayout>
  </div>
</template>

<script>
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'
import BasicLayout from './components/layouts/Basic'

export default {
  components: {
    BasicLayout
  }
}
</script>

<style>
</style>