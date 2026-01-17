import { reactive, readonly } from 'vue';
import { http } from '@/utils/fetch';

const pdfs = reactive(new Map());
const categories = reactive(new Map());

async function fetchMetadata() {
  if (pdfs.size > 0) {
    return;
  }

  const metadata = await http.get('/pdfs-data/metadata.json');

  metadata.pdfs.forEach(pdf => {
    pdfs.set(pdf.name, pdf);
  });

  metadata.categories.forEach(cat => {
    const pdfNames = metadata.pdfs
      .filter(pdf => pdf.category === cat.name)
      .map(pdf => pdf.name);
    categories.set(cat.name, { ...cat, pdfs: pdfNames });
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
