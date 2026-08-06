import { fetchCategories } from "../../../api/services/categories.js";

export const fetchCategoriesData = async () => {
  const categories = await fetchCategories();
  return { categories };
};
