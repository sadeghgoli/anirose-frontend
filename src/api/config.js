export const API_BASE_URL = '/api/v2';

export const API_ENDPOINTS = {
  auth: {
    sendOtp: '/auth/send-otp',
    verifyOtp: '/auth/verify-otp',
    logout: '/auth/logout',
    profile: '/user/profile',
  },
  categories: '/categories',
  products: '/products',
  typeOfWeights: '/type-of-weights',
  provinces: '/provinces',
  shippingMethods: '/shipping-methods',
  articles: '/articles',
  contactSettings: '/contact-settings',
  addresses: '/user/addresses',
  orders: '/user/orders',
  discountValidate: '/discount/validate',
  cart: {
    get: '/cart',
    count: '/cart/count',
    items: '/cart/items',
    applyDiscount: '/cart/apply-discount',
    removeDiscount: '/cart/remove-discount',
    selectShipping: '/cart/select-shipping',
    sync: '/cart/sync',
    checkout: '/cart/checkout',
    clear: '/cart',
  },
  analytics: {
    collect: '/analytics/collect',
  },
};

export const CACHE_DURATION = 40 * 1000;

export const TOKEN_VALIDATION_INTERVAL = 50 * 1000;
