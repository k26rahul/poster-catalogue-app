import { ref, computed, onMounted, onUnmounted } from 'vue';

const DURATION = 5000;

export function useCarousel(items) {
  const currentIndex = ref(0);
  const currentItem = computed(() => items[currentIndex.value]);

  let intervalId;

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  };

  const startTimer = () => {
    if (items.length > 1) {
      intervalId = setInterval(() => {
        currentIndex.value = (currentIndex.value + 1) % items.length;
      }, DURATION);
    }
  };

  onMounted(() => {
    startTimer();
  });

  onUnmounted(() => {
    stopTimer();
  });

  const setIndex = index => {
    currentIndex.value = index;
    stopTimer();
  };

  let startX = 0;

  const onTouchStart = e => {
    startX = e.touches[0].clientX;
  };

  const onTouchEnd = e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 40) return;

    if (dx < 0 && currentIndex.value < items.length - 1) {
      // swipe left -> next
      currentIndex.value++;
      stopTimer();
    } else if (dx > 0 && currentIndex.value > 0) {
      // swipe right -> prev
      currentIndex.value--;
      stopTimer();
    }
  };

  return {
    currentIndex,
    currentItem,
    setIndex,
    onTouchStart,
    onTouchEnd,
  };
}
