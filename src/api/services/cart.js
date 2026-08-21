import axiosInstance from '../axios.js';
import { API_ENDPOINTS } from '../config.js';
import { notifyCartUpdated } from '../../utils/cartEvents.js';

const mapCartItem = (item) => {
  const product = item.product || {};
  return {
    cart_item_id: item.item_id,
    product_id: item.product_id,
    name: product.title || product.name || '',
    image: product.primary_image || product.image || '',
    price: item.unit_price || 0,
    quantity: item.quantity || 0,
    subtotal: item.line_total || 0,
    weight: item.weight || 0,
    available_stock: item.available_stock ?? 0,
    type_of_weight: item.type_of_weight
      ? {
          id: item.type_of_weight.id,
          title: item.type_of_weight.title,
          weight: item.type_of_weight.weight,
        }
      : null,
    type_of_weight_id: item.type_of_weight?.id || null,
    product: {
      id: product.id,
      name: product.title || product.name,
      slug: product.slug,
      price: product.price || 0,
      price_discounted: product.price_discounted || null,
      has_discount: !!product.has_discount,
    },
  };
};

const mapCart = (data) => {
  const summary = data.summary || {};
  return {
    items: (data.items || []).map(mapCartItem),
    subtotal: summary.total_amount || 0,
    total: summary.final_amount || 0,
    discount: summary.discount_amount || 0,
    total_weight: summary.total_weight || 0,
    total_quantity: summary.total_quantity || 0,
    shipping_fee: summary.shipping_fee || 0,
    discount_info: data.discount || null,
    coupon_code: data.discount?.code || null,
    shipping: data.shipping || null,
  };
};

export const fetchCart = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.cart.get);
  return {
    status: 'success',
    data: mapCart(response.data?.data || {}),
  };
};

export const fetchCartCount = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.cart.count);
  return response.data?.data?.count || 0;
};

export const addToCart = async ({ product_id, type_of_weight_id, quantity = 1 }) => {
  const response = await axiosInstance.post(API_ENDPOINTS.cart.items, {
    product_id,
    type_of_weight_id: type_of_weight_id || undefined,
    quantity,
  });
  notifyCartUpdated();
  return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
  const response = await axiosInstance.put(`${API_ENDPOINTS.cart.items}/${itemId}`, { quantity });
  notifyCartUpdated();
  return { status: 'success', ...response.data };
};

export const removeCartItem = async (itemId) => {
  const response = await axiosInstance.delete(`${API_ENDPOINTS.cart.items}/${itemId}`);
  notifyCartUpdated();
  return { status: 'success', ...response.data };
};

export const clearCart = async () => {
  const response = await axiosInstance.delete(API_ENDPOINTS.cart.clear);
  notifyCartUpdated();
  return { status: 'success', ...response.data };
};

export const applyCoupon = async (code, type = 'discount') => {
  const response = await axiosInstance.post(API_ENDPOINTS.cart.applyDiscount, { code, type });
  notifyCartUpdated();
  return { status: 'success', ...response.data };
};

export const removeCoupon = async (type = 'discount') => {
  const response = await axiosInstance.post(API_ENDPOINTS.cart.removeDiscount, { type });
  notifyCartUpdated();
  return { status: 'success', ...response.data };
};

export const selectShipping = async (shippingMethodId) => {
  const response = await axiosInstance.post(API_ENDPOINTS.cart.selectShipping, {
    shipping_method_id: shippingMethodId,
  });
  notifyCartUpdated();
  return { status: 'success', ...response.data };
};

export const syncCart = async () => {
  const response = await axiosInstance.post(API_ENDPOINTS.cart.sync);
  notifyCartUpdated();
  return { status: 'success', ...response.data };
};

export const checkoutCart = async ({ address_id, notes = '' }) => {
  const response = await axiosInstance.post(API_ENDPOINTS.cart.checkout, { address_id, notes });
  notifyCartUpdated();
  return response.data;
};

export const updateCart = async () => {
  const response = await syncCart();
  return response;
};
