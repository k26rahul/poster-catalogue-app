<script setup>
import { pdfStore } from './stores';
import { RouterView } from 'vue-router';
import BottomNav from './components/BottomNav.vue';
import GlobalLoadingBar from './components/GlobalLoadingBar.vue';
import GlobalErrorBar from './components/GlobalErrorBar.vue';

const { state } = pdfStore;
</script>

<template>
  <header>
    <GlobalLoadingBar v-if="state.isLoading" />
    <GlobalErrorBar v-if="state.error" />
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
