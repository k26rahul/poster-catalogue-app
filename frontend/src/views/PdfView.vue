<script setup>
import { computed, onMounted, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { pdfStore, cartStore } from '@/stores';
import PosterCard from '@/components/PosterCard.vue';

const { pdfs, fetchPdf } = pdfStore;
const route = useRoute();
const sortOrder = ref('sequential');
const displayedPosters = ref([]);

const pdfData = computed(() => {
  const pdfName = route.params.pdfName;
  return pdfs.get(pdfName);
});

watch(
  () => pdfData.value?.posters,
  newPosters => {
    if (newPosters) {
      displayedPosters.value = newPosters;
      sortOrder.value = 'sequential';
    } else {
      displayedPosters.value = [];
    }
  },
);

function applySort() {
  if (!pdfData.value?.posters) return;

  const posters = [...pdfData.value.posters];

  if (sortOrder.value === 'selected') {
    const pdfName = route.params.pdfName;
    const postersInCart = cartStore.cart.get(pdfName);

    if (postersInCart?.size > 0) {
      const selectedPosters = [];
      const unselectedPosters = [];

      for (const poster of posters) {
        if (postersInCart.has(poster.id)) {
          selectedPosters.push(poster);
        } else {
          unselectedPosters.push(poster);
        }
      }

      selectedPosters.sort(
        (a, b) => postersInCart.get(b.id).addedAt - postersInCart.get(a.id).addedAt,
      );
      unselectedPosters.sort((a, b) => a.index - b.index);

      displayedPosters.value = [...selectedPosters, ...unselectedPosters];
      return;
    }
  }

  // sequential, default order is by index
  displayedPosters.value = posters.sort((a, b) => a.index - b.index);
}

onMounted(() => {
  const pdfName = route.params.pdfName;
  fetchPdf(pdfName);
});
</script>

<template>
  <section v-if="pdfData">
    <h2>{{ pdfData.readable_name }}</h2>
    <p>{{ pdfData.total_posters }} posters</p>

    <div class="sort-options">
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

    <div class="posters-grid">
      <PosterCard
        v-for="poster in displayedPosters"
        :key="poster.index"
        :poster="poster"
      />
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

.sort-options {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.sort-options button {
  padding: 4px 12px;
  border: 1px solid var(--border-color, #ccc);
  border-radius: 4px;
  background-color: var(--bg-secondary, #f0f0f0);
  color: var(--text-primary);
  cursor: pointer;
}

.sort-options label {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
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
