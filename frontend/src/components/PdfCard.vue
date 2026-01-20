<script setup>
import { useRouter } from 'vue-router';
import { useCarousel } from '@/composables/useCarousel';

const props = defineProps({
  pdf: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const posters = props.pdf.postersSample;
const {
  currentIndex: currentPosterIndex,
  currentItem: currentPoster,
  setIndex: onDotClick,
  onTouchStart,
  onTouchEnd,
} = useCarousel(posters);

const goToPdf = () => {
  router.push({
    name: 'pdf',
    params: {
      pdfName: props.pdf.name,
    },
  });
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
      :key="currentPoster.id"
      :src="`/poster-images/${currentPoster.imageFile}`"
      :alt="currentPoster.id"
      :width="currentPoster.imageSize[0]"
      :height="currentPoster.imageSize[1]"
    />

    <div class="dots">
      <div
        class="dot"
        v-for="(_, i) in posters"
        :key="i"
        :class="{ active: i === currentPosterIndex }"
        @click.stop="onDotClick(i)"
      >
        <span></span>
      </div>
    </div>

    <strong>{{ pdf.readableName }}</strong>

    <p>{{ pdf.totalPosters }} posters</p>
  </div>
</template>

<style scoped>
.pdf-card {
  width: 20rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.pdf-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--card-shadow-hover);
}

.pdf-card img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
}

.dots {
  display: flex;
}

.dot {
  padding: 0.5rem;
}

.dot span {
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: var(--dot-bg);
}

.dot.active span {
  background: var(--dot-active);
}
</style>
