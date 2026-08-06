import { fetchCart as apiFetchCart, updateCartItem as apiUpdateItem, removeCartItem as apiRemoveItem, applyCoupon as apiApplyCoupon, updateCart as apiUpdateCart } from "../../../api/services/cart.js";

export const fetchCart = async () => apiFetchCart();
export const updateCartItem = async (cartItemId, quantity) => apiUpdateItem(cartItemId, quantity);
export const removeCartItem = async (cartItemId) => apiRemoveItem(cartItemId);
export const applyCoupon = async (couponCode) => apiApplyCoupon(couponCode);
export const updateCart = async (items) => apiUpdateCart(items);
