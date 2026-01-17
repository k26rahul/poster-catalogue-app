import { reactive, readonly } from 'vue';
import { http } from '@/utils/fetch';

const state = reactive({
  metadata: null,
  pdfs: {},
  isLoading: false,
  error: null,
});

async function fetchMetadata() {
  if (state.metadata) return;

  state.isLoading = true;
  state.error = null;
  try {
    const data = await http.get('/pdfs-data/metadata.json');
    state.metadata = data;
  } catch (e) {
    state.error = e.message || String(e);
  } finally {
    state.isLoading = false;
  }
}

const pendingPdfPromises = {};

async function fetchPdf(pdfName) {
  if (state.pdfs[pdfName]) {
    return state.pdfs[pdfName];
  }

  if (pendingPdfPromises[pdfName]) {
    return pendingPdfPromises[pdfName];
  }

  state.isLoading = true;
  state.error = null;

  const fetchPromise = (async () => {
    try {
      const data = await http.get(`/pdfs-data/${pdfName}.json`);
      state.pdfs[pdfName] = data;
      return data;
    } catch (e) {
      state.error = e.message || String(e);
      return null;
    } finally {
      state.isLoading = false;
      delete pendingPdfPromises[pdfName];
    }
  })();

  pendingPdfPromises[pdfName] = fetchPromise;
  return fetchPromise;
}

export const pdfStore = readonly({
  state,
  fetchMetadata,
  fetchPdf,
});
