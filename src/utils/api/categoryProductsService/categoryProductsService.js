import { fetchCategoryProducts as apiFetchCatProducts } from "../../../api/services/products.js";

export const fetchCategoryProducts = async (categoryId) => {
  const result = await apiFetchCatProducts(categoryId);
  return { products: result.data };
};
