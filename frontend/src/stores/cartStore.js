import { reactive, readonly, watch } from 'vue';
import { stringify } from '@/utils/json';

const STORAGE_KEY = 'POSTER_CATALOGUE_CART_DATA';

const cart = reactive(new Map());

function initializeCart() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);

    for (const [pdfName, posters] of Object.entries(parsed)) {
      cart.set(pdfName, new Map(Object.entries(posters)));
    }
  }
}

function addPoster(pdfName, posterId) {
  if (!cart.has(pdfName)) {
    cart.set(pdfName, new Map());
  }
  const postersInPdf = cart.get(pdfName);

  if (postersInPdf.has(posterId)) {
    const poster = postersInPdf.get(posterId);
    poster.qty++;
    poster.addedAt = Date.now();
  } else {
    postersInPdf.set(posterId, {
      qty: 1,
      addedAt: Date.now(),
    });
  }
}

function removePoster(pdfName, posterId) {
  const postersInPdf = cart.get(pdfName);
  const poster = postersInPdf.get(posterId);
  poster.qty--;

  if (poster.qty <= 0) {
    postersInPdf.delete(posterId);
  }

  if (postersInPdf.size === 0) {
    cart.delete(pdfName);
  }
}

function clearCart() {
  cart.clear();
}

watch(
  cart,
  newCart => {
    localStorage.setItem(STORAGE_KEY, stringify(newCart));
  },
  { deep: true },
);

initializeCart();

export const cartStore = {
  cart: readonly(cart),
  addPoster,
  removePoster,
  clearCart,
};
