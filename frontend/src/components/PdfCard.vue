<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  pdf: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const current = ref(0);

const posters = props.pdf.postersSample;
const currentPoster = computed(() => posters[current.value]);

let intervalId;
onMounted(() => {
  if (posters.length > 1) {
    intervalId = setInterval(() => {
      current.value = (current.value + 1) % posters.length;
    }, 2000);
  }
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

const goToPdf = () => {
  router.push({
    name: 'pdf',
    params: {
      pdfName: props.pdf.name,
    },
  });
};

let startX = 0;

const onTouchStart = e => {
  startX = e.touches[0].clientX;
};

const onTouchEnd = e => {
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) < 40) return;

  if (dx < 0 && current.value < posters.length - 1) {
    current.value++;
    clearInterval(intervalId);
  } else if (dx > 0 && current.value > 0) {
    current.value--;
    clearInterval(intervalId);
  }
};

const onDotClick = i => {
  current.value = i;
  clearInterval(intervalId);
};
</script>

<template>
  <div
    class="pdf-card"
    :class="{ landscape: pdf.usedLandscapeForSample }"
    @click="goToPdf"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <img
      :src="`/poster-images/${currentPoster.imageFile}`"
      :alt="currentPoster.id"
      :width="currentPoster.imageSize[0]"
      :height="currentPoster.imageSize[1]"
    />

    <div class="dots">
      <span
        v-for="(_, i) in posters"
        :key="i"
        :class="{ active: i === current }"
        @click.stop="onDotClick(i)"
      />
    </div>

    <h3>{{ pdf.readableName }}</h3>
    <p>{{ pdf.totalPosters }} posters</p>
  </div>
</template>

<style scoped>
.pdf-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background: var(--card-bg);
  text-align: center;
  cursor: pointer;
  box-shadow: var(--card-shadow);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  width: 100%;
}

.pdf-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--card-shadow-hover);
}

@media (min-width: 400px) {
  .pdf-card {
    width: 140px;
  }
  .pdf-card.landscape {
    width: 210px;
  }
}

@media (min-width: 550px) {
  .pdf-card {
    width: 200px;
  }
  .pdf-card.landscape {
    width: 300px;
  }
}

@media (min-width: 700px) {
  .pdf-card {
    width: 240px;
  }
  .pdf-card.landscape {
    width: 360px;
  }
}

.pdf-card img {
  width: 100%;
  height: auto;
  border-radius: 6px;
  object-fit: contain;
  background: var(--card-image-bg);
}

.dots {
  display: flex;
  gap: 6px;
  margin: 8px 0 4px;
}

.dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--dot-bg);
}

.dots span.active {
  background: var(--dot-active);
}

.pdf-card h3 {
  margin: 6px 0 4px;
  font-size: 0.95rem;
  color: var(--text-primary);
}

.pdf-card p {
  font-size: 0.85rem;
  color: var(--text-secondary);
}
</style>
