import axiosInstance from '../axios.js';
import { API_ENDPOINTS, CACHE_DURATION } from '../config.js';
import { fetchWithCache } from '../cache.js';

const mapCategory = (cat) => ({
  id: cat.id,
  name: cat.title || '',
  title: cat.title || '',
  slug: cat.slug || '',
  image: cat.image || '',
  status: cat.status,
  parent_id: cat.parent_id,
  children: (cat.children || []).map(mapCategory),
  products_count: cat.products_count,
});

export const fetchCategories = async () => {
  const result = await fetchWithCache(
    'categories',
    async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.categories);
      return response.data;
    },
    CACHE_DURATION
  );
  return (result?.data || []).map(mapCategory);
};

export const fetchCategoryById = async (id) => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.categories}/${id}`);
  return response.data?.data ? mapCategory(response.data.data) : null;
};
