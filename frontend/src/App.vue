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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  padding-bottom: calc(1rem + 4rem); /* 4rem space for bottom nav */
}
</style>
