import { reactive, watch } from 'vue';

const STORAGE_KEY = 'POSTER_CATALOGUE_CART_DATA_V2';

const cart = reactive({});

function initializeCart() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      Object.assign(cart, JSON.parse(stored));
    } catch (e) {
      // ignore parsing errors
    }
  }
}

function addPoster(pdfName, poster) {
  if (!cart[pdfName]) {
    cart[pdfName] = [];
  }
  cart[pdfName].push({
    posterId: poster.id,
    addedAt: Date.now(),
  });
}

function removePoster(pdfName, posterId) {
  const index = cart[pdfName].findIndex(p => p.posterId === posterId);
  if (index !== -1) {
    cart[pdfName].splice(index, 1);
  }

  if (cart[pdfName].length === 0) {
    delete cart[pdfName];
  }
}

function getCartForPdf(pdfName) {
  return cart[pdfName] || [];
}

function clearCart() {
  for (const key in cart) {
    delete cart[key];
  }
}

watch(
  cart,
  newCart => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newCart));
  },
  { deep: true },
);

initializeCart();

export const cartStore = {
  cart,
  addPoster,
  removePoster,
  getCartForPdf,
  clearCart,
};
