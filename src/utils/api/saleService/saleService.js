import { fetchProducts } from "../../../api/services/products.js";

export const fetchSaleProducts = async () => {
  const result = await fetchProducts({ suggested: true, per_page: 20 });
  return { products: result.products };
};
