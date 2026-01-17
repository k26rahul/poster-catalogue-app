import { ref, readonly } from 'vue';

const isLoading = ref(false);
const error = ref(null);

function startLoading() {
  isLoading.value = true;
  error.value = null;
}

function stopLoading() {
  isLoading.value = false;
}

function setError(e) {
  error.value = e.message || String(e);
  isLoading.value = false;
}

export const globalStore = {
  isLoading: readonly(isLoading),
  error: readonly(error),
  startLoading,
  stopLoading,
  setError,
};
