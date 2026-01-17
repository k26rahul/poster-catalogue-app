<script setup>
import { computed, onMounted } from 'vue';
import { pdfStore } from '../stores';
import PdfCard from '../components/PdfCard.vue';

const { state, fetchMetadata } = pdfStore;

onMounted(fetchMetadata);

const groupedByCategory = computed(() => {
  if (!state.metadata) return [];

  const { pdfs, categories } = state.metadata;

  return categories.map(cat => ({
    name: cat.name,
    description: cat.description,
    pdfs: pdfs.filter(pdf => pdf.category === cat.name),
  }));
});
</script>

<template>
  <section v-for="category in groupedByCategory" :key="category.name">
    <h2>{{ category.name }}</h2>
    <p>{{ category.description }}</p>

    <div class="pdf-grid">
      <PdfCard v-for="pdf in category.pdfs" :key="pdf.name" :pdf="pdf" />
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 16px;
}

.pdf-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
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
