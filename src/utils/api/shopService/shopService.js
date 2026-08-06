import { fetchFilteredProducts, fetchAllProducts as apiFetchAll } from "../../../api/services/products.js";
import { fetchCategories } from "../../../api/services/categories.js";

export const getFilteredProducts = async (filters, page, perPage) => {
  return fetchFilteredProducts(filters, page, perPage);
};

export const getCategories = async () => {
  const cats = await fetchCategories();
  return cats;
};

export const getPriceRange = async () => {
  try {
    const products = await apiFetchAll();
    let min = Infinity, max = -Infinity;
    (products || []).forEach(p => {
      const price = parseInt(String(p.salePrice || p.price).replace(/,/g, ''));
      if (price < min) min = price;
      if (price > max) max = price;
    });
    return { min: min === Infinity ? 0 : min, max: max === -Infinity ? 10000000 : max };
  } catch {
    return { min: 0, max: 10000000 };
  }
};

export const getProductById = async (id) => {
  try {
    const { fetchProductById } = await import("../../../api/services/products.js");
    const product = await fetchProductById(id);
    if (product) return { status: "success", data: product };
    return { status: "error", message: "محصول یافت نشد" };
  } catch {
    return { status: "error", message: "خطا در دریافت محصول" };
  }
};
