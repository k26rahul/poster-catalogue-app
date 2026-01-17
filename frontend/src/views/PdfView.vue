<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { pdfStore } from '@/stores';
import PosterCard from '@/components/PosterCard.vue';

const { state, fetchPdf } = pdfStore;
const pdfData = ref(null);
const route = useRoute();

async function loadPdfData(pdfName) {
  const data = await fetchPdf(pdfName);
  pdfData.value = data;
}

onMounted(() => {
  const pdfName = route.params.pdfName;
  if (pdfName) {
    // Check if data is already in the main store
    if (state.pdfs[pdfName]) {
      pdfData.value = state.pdfs[pdfName];
    } else {
      loadPdfData(pdfName);
    }
  }
});

watch(
  () => route.params.pdfName,
  newPdfName => {
    if (newPdfName) {
      if (state.pdfs[newPdfName]) {
        pdfData.value = state.pdfs[newPdfName];
      } else {
        loadPdfData(newPdfName);
      }
    }
  },
);
</script>

<template>
  <section v-if="pdfData">
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
