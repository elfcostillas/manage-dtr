
<template>
      <Navbar ref="refNavBar"></Navbar>
  <div >
      <router-view v-slot="{ Component }" >
          <component @reloadNavBar="reloadNavBar" :is="Component" ></component>
      </router-view>
  </div>

</template>

<script setup>
// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'

    import { ref,onMounted } from 'vue';
    import Navbar from './components/auth/Navbar.vue';
    const refNavBar = ref();
    const reloadNavBar = () => {
        refNavBar.value.reloadNavBar();
    };

</script>


<style scoped>

</style>
