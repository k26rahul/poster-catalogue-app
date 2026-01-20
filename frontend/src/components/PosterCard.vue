<script setup>
import { computed } from 'vue';
import { cartStore } from '@/stores/cartStore';

const props = defineProps({
  poster: {
    type: Object,
    required: true,
  },
});

const { cart, addPoster, removePoster } = cartStore;

const pdfName = computed(() => props.poster.pdfName);

const qty = computed(() => {
  return cart.get(pdfName.value)?.get(props.poster.id)?.qty || 0;
});

const isActive = computed(() => qty.value >= 1);

const inc = e => {
  e.stopPropagation();
  addPoster(pdfName.value, props.poster.id);
};

const dec = e => {
  e.stopPropagation();
  if (qty.value > 0) {
    removePoster(pdfName.value, props.poster.id);
  }
};
</script>

<template>
  <div class="poster-card">
    <img :src="`/poster-images/${poster.imageFile}`" :alt="poster.id" />

    <div class="qty-overlay" :class="{ active: isActive }">
      <div class="qty-left" :class="{ visible: isActive }">
        <button @click="dec">−</button>
        <span>{{ qty }}</span>
      </div>

      <button class="qty-plus" @click="inc">+</button>
    </div>

    <div class="title">
      {{ poster.code }}
    </div>
  </div>
</template>

<style scoped>
.poster-card {
  width: 20rem;
  padding: 0.5rem;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background: var(--card-bg);
  box-shadow: var(--card-shadow);
}

.poster-card img {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 4px;
}

.qty-overlay {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  overflow: hidden;
  color: var(--accent);
  background-color: #fff;
  box-shadow: var(--overlay-shadow);
  transition: box-shadow 0.15s ease;
}

.qty-overlay.active {
  color: #fff;
  background: var(--accent);
  box-shadow: var(--overlay-shadow-active);
}

.qty-left {
  display: flex;
  align-items: center;
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transition:
    max-width 0.2s ease,
    opacity 0.15s ease;
}

.qty-left.visible {
  max-width: 120px;
  opacity: 1;
}

.qty-overlay button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.5rem;
  background: transparent;
  cursor: pointer;
}

.qty-overlay span {
  min-width: 1.5rem;
  text-align: center;
  font-weight: 600;
}

.qty-overlay:not(.active) .qty-plus {
  background: #fff;
  color: var(--accent);
}

.title {
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
