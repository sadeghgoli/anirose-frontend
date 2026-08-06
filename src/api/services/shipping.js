import axiosInstance from '../axios.js';
import { API_ENDPOINTS, CACHE_DURATION } from '../config.js';
import { fetchWithCache } from '../cache.js';

export const fetchShippingMethods = async () => {
  const result = await fetchWithCache(
    'shipping_methods',
    async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.shippingMethods);
      return response.data;
    },
    CACHE_DURATION * 6
  );
  return {
    status: 'success',
    data: (result?.data || []).map((m) => ({
      id: m.id,
      name: m.name,
      cost: m.base_shipping_cost,
      base_shipping_cost: m.base_shipping_cost,
      base_insurance_cost: m.base_insurance_cost,
      base_packaging_cost: m.base_packaging_cost,
      package_weight_limit: m.package_weight_limit,
      extra_weight_cost: m.extra_weight_cost,
      extra_weight_per_kg: m.extra_weight_per_kg,
      description: m.description,
      sort_order: m.sort_order,
      is_active: m.is_active,
    })),
  };
};
