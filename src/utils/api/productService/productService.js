import { fetchProductById } from "../../../api/services/products.js";

export const fetchAllProducts = async () => {
  const { fetchAllProducts: getAll } = await import("../../../api/services/products.js");
  return getAll();
};

export { fetchProductById };

export const fetchRelatedProducts = async (categoryId, currentProductId) => {
  const product = await fetchProductById(currentProductId);
  return product?.relatedProducts || [];
};
