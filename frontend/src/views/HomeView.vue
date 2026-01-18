<script setup>
import { onMounted, ref, reactive } from 'vue';
import { pdfStore } from '../stores';
import PdfCard from '../components/PdfCard.vue';

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

onMounted(fetchMetadata);
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
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.categories-list {
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pdf-cards-container {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

@media (min-width: 600px) {
  .pdf-cards-container {
    justify-content: start;
  }
}
</style>
