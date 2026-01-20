<script setup>
import { ref, computed, onMounted, onUpdated, watch } from 'vue';
import { useRoute } from 'vue-router';
import { pdfStore, cartStore } from '@/stores';
import PosterCard from '@/components/PosterCard.vue';

const route = useRoute();
const pdfName = route.params.pdfName;

const { pdfs, fetchPdf } = pdfStore;
const { cart } = cartStore;

const pdfData = computed(() => pdfs.get(pdfName));
const sortOrder = ref('sequential');
const displayedPosters = ref([]);

function applySort() {
  const posters = [...pdfData.value.posters];

  if (sortOrder.value === 'selected') {
    const postersInCart = cart.get(pdfName);

    if (postersInCart?.size > 0) {
      const selectedPosters = [];
      const unselectedPosters = [];

      for (const poster of posters) {
        if (postersInCart.has(poster.id)) selectedPosters.push(poster);
        else unselectedPosters.push(poster);
      }

      displayedPosters.value = [...selectedPosters, ...unselectedPosters];
    }
  } else {
    // sequential
    displayedPosters.value = posters;
  }
}

onMounted(async () => {
  console.log('PdfView mounted');
  await fetchPdf(pdfName);
  applySort();
});

onUpdated(() => {
  console.log('PdfView updated');
});
</script>

<template>
  <section v-if="pdfData">
    <div>
      <h2>{{ pdfData.readableName }}</h2>

      <p>{{ pdfData.totalPosters }} posters</p>
    </div>

    <div class="controls">
      <label>
        <input v-model="sortOrder" type="radio" value="sequential" />
        Sequential
      </label>

      <label>
        <input v-model="sortOrder" type="radio" value="selected" />
        Selected First
      </label>

      <button @click="applySort">Apply Sort</button>
    </div>

    <div class="poster-cards-container">
      <PosterCard v-for="poster in displayedPosters" :key="poster.id" :poster="poster" />
    </div>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

h2 {
  margin-bottom: 0.5rem;
}

.controls {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
  font-size: 0.875rem;
}

.poster-cards-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
