<script setup>
import { RouterView } from 'vue-router';
import BottomNav from './components/BottomNav.vue';
import GlobalLoadingBar from './components/GlobalLoadingBar.vue';
import GlobalErrorBar from './components/GlobalErrorBar.vue';
</script>

<template>
  <header>
    <GlobalLoadingBar />
    <GlobalErrorBar />
  </header>

  <main>
    <RouterView />
  </main>

  <BottomNav />
</template>

<style>
main {
  padding-bottom: 64px; /* space for bottom nav */
}
</style>
