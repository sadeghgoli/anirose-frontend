const getMockCartData = () => {
  try {
    const data = localStorage.getItem('aniroz_cart');
    const cart = data ? JSON.parse(data) : { items: [], subtotal: 0, total: 0, totalQuantity: 0 };
    return {
      items: cart.items || [],
      total: cart.total || 0,
      totalQuantity: (cart.items || []).reduce((sum, i) => sum + (i.quantity || 0), 0),
      cart_url: "/cart",
      checkout_url: "/checkout"
    };
  } catch {
    return { items: [], total: 0, totalQuantity: 0, cart_url: "/cart", checkout_url: "/checkout" };
  }
};

export const fetchHeaderData = async () => {
  const cartData = getMockCartData();
  return {
    cart: cartData
  };
};

export const removeCartItem = async (itemId) => {
  const { removeCartItem } = await import("../../../api/services/cart.js");
  return removeCartItem(itemId);
};

export const updateCartQuantity = async (itemId, quantity) => {
  const { updateCartItem } = await import("../../../api/services/cart.js");
  return updateCartItem(itemId, quantity);
};
