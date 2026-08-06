import { fetchProvinces } from "../../../api/services/provinces.js";
import { validateDiscountCode } from "../../../api/services/discounts.js";
import { placeOrder } from "../../../api/services/orders.js";
import { fetchCart } from "../../../api/services/cart.js";

export { fetchProvinces };
export { validateDiscountCode as applyCouponCheckout };
export { placeOrder };

export const fetchCheckoutCart = async () => {
  return fetchCart();
};
