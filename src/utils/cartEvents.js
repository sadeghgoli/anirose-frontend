export const CART_UPDATED_EVENT = 'cart:updated';

export const notifyCartUpdated = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  }
};

export const subscribeCartUpdated = (cb) => {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener(CART_UPDATED_EVENT, cb);
  return () => window.removeEventListener(CART_UPDATED_EVENT, cb);
};
