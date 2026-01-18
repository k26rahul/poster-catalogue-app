import { reactive, readonly } from 'vue';
import { http } from '@/utils/fetch';

const pdfs = reactive(new Map());
const categories = reactive(new Map());

async function fetchMetadata() {
  if (pdfs.size > 0) {
    return;
  }

  const metadata = await http.get('/pdfs-data/metadata.json');

  metadata.categories.forEach(cat => {
    categories.set(cat.name, { ...cat, pdfs: [] });
  });

  metadata.pdfs.forEach(pdf => {
    pdfs.set(pdf.name, pdf);
    categories.get(pdf.category).pdfs.push(pdf.name);
  });
}

async function fetchPdf(pdfName) {
  await fetchMetadata();

  if (pdfs.get(pdfName).posters.length > 0) {
    return;
  }

  const fullPdfData = await http.get(`/pdfs-data/${pdfName}.json`);
  pdfs.get(pdfName).posters = fullPdfData.posters;
}

export const pdfStore = {
  pdfs: readonly(pdfs),
  categories: readonly(categories),
  fetchMetadata,
  fetchPdf,
};
