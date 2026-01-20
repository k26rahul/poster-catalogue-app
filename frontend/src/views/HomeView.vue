<script setup>
import { ref, reactive, onMounted, onUpdated } from 'vue';
import { pdfStore } from '@/stores';
import PdfCard from '@/components/PdfCard.vue';

const { fetchMetadata, categories, pdfs } = pdfStore;

const categoryStates = reactive({});
const shouldExpandAll = ref(true);

function toggleAll() {
  const newState = shouldExpandAll.value;
  for (const category of categories.values()) {
    categoryStates[category.name] = newState;
  }
  shouldExpandAll.value = !newState;
}

function onToggle(event, categoryName) {
  categoryStates[categoryName] = event.target.open;
}

onMounted(() => {
  console.log('HomeView mounted');
  fetchMetadata();
});

onUpdated(() => {
  console.log('HomeView updated');
});
</script>

<template>
  <div class="controls">
    <button @click="toggleAll">
      {{ shouldExpandAll ? 'Expand All' : 'Collapse All' }}
    </button>
  </div>

  <div class="categories-list">
    <details
      v-for="category in categories.values()"
      :key="category.name"
      :open="categoryStates[category.name]"
      @toggle="onToggle($event, category.name)"
    >
      <summary>{{ category.name }}</summary>

      <p>{{ category.description }}</p>

      <div class="pdf-cards-container">
        <PdfCard
          v-for="pdfName in category.pdfs"
          :key="pdfName"
          :pdf="pdfs.get(pdfName)"
        />
      </div>
    </details>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  justify-content: flex-end;
}

.categories-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pdf-cards-container {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (min-width: 40rem) {
  .pdf-cards-container {
    justify-content: start;
  }
}
</style>
