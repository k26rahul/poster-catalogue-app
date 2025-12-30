<script setup>
import { onMounted } from 'vue';
import { usePdfsMetadata } from '../composables/usePdfsMetadata';

const { items, loading, error, load } = usePdfsMetadata();

onMounted(() => {
  load();
});
</script>

<template>
  <main>
    <section v-if="loading">Loading...</section>
    <section v-else-if="error">Error: {{ error }}</section>
    <ul v-else>
      <li v-for="item in items" :key="item.id">
        {{ item.id }} — Category: {{ item.category }}; Total posters: {{ item.total_posters }}
      </li>
    </ul>
  </main>
</template>
