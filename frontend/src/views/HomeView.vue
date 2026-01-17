<script setup>
import { onMounted } from 'vue';
import { pdfStore } from '../stores';
import PdfCard from '../components/PdfCard.vue';

const { fetchMetadata, categories, pdfs } = pdfStore;

onMounted(fetchMetadata);
</script>

<template>
  <section v-for="category in categories.values()" :key="category.name">
    <h2>{{ category.name }}</h2>
    <p>{{ category.description }}</p>

    <div class="pdf-grid">
      <PdfCard v-for="pdfName in category.pdfs" :key="pdfName" :pdf="pdfs.get(pdfName)" />
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 16px;
}

.pdf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
  grid-auto-flow: dense;
}

h2 {
  margin: 8px 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

p {
  margin: 4px 0 12px;
  font-size: 0.95rem;
  color: var(--text-secondary);
}
</style>
