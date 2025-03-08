<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
      <Navbar></Navbar>
  <div >
      <router-view v-slot="{ Component }" >
          <component :is="Component" ></component>
      </router-view>
  </div>

</template>

<style scoped>

</style>
