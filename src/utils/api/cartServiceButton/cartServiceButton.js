import { addToCart as apiAddToCart } from "../../../api/services/cart.js";

export const addToCart = async (productId, typeOfWeightId, quantity = 1) => {
  return apiAddToCart({ product_id: productId, type_of_weight_id: typeOfWeightId, quantity });
};
