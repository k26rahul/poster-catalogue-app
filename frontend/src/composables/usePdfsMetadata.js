import { ref } from 'vue';
import { http } from '@/utils/fetch';

const metadata = ref(null);
const isLoading = ref(false);
const error = ref(null);

let fetchPromise = null;

async function fetchMetadata() {
  if (metadata.value !== null) return;
  if (fetchPromise) return fetchPromise;

  isLoading.value = true;
  error.value = null;

  fetchPromise = (async () => {
    try {
      metadata.value = await http.get('/pdfs-data/metadata.json');
    } catch (e) {
      error.value = e.message || String(e);
    } finally {
      isLoading.value = false;
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

export function usePdfsMetadata() {
  return {
    metadata,
    isLoading,
    error,
    fetchMetadata,
  };
}
