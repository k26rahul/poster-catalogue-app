import { ref } from 'vue';

const items = ref(null);
const loading = ref(false);
const error = ref(null);
let loadingPromise = null;

async function load() {
  if (items.value !== null) return { items, loading, error };
  if (loadingPromise) {
    await loadingPromise;
    return { items, loading, error };
  }

  loading.value = true;
  loadingPromise = (async () => {
    try {
      const res = await fetch('/json/pdfs_metadata.json');
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      const json = await res.json();
      items.value = Object.entries(json).map(([id, v]) => ({
        id,
        category: v.category,
        total_posters: v.total_posters,
      }));
    } catch (e) {
      error.value = e.message || String(e);
    } finally {
      loading.value = false;
    }
  })();

  await loadingPromise;
  return { items, loading, error };
}

export function usePdfsMetadata() {
  return { items, loading, error, load };
}
