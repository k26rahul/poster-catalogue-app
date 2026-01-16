<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePdfData } from '@/composables/usePdfData';
import PosterCard from '@/components/PosterCard.vue';

const { pdfData, isLoading, error, fetchPdf } = usePdfData();

onMounted(() => {
  const pdfName = useRoute().params.pdfName;
  if (pdfName) fetchPdf(pdfName);
});
</script>

<template>
  <section v-if="isLoading">Loading...</section>

  <section v-else-if="error">Error: {{ error }}</section>

  <section v-else-if="pdfData">
    <h2>{{ pdfData.readable_name }}</h2>
    <p>{{ pdfData.total_posters }} posters</p>

    <div class="posters-grid">
      <PosterCard v-for="poster in pdfData.posters" :key="poster.index" :poster="poster" />
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 16px;
}

h2 {
  margin: 8px 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.posters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
}

p {
  margin: 4px 0 12px;
  font-size: 0.95rem;
  color: var(--text-secondary);
}
</style>
