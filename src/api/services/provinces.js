import axiosInstance from '../axios.js';
import { API_ENDPOINTS, CACHE_DURATION } from '../config.js';
import { fetchWithCache } from '../cache.js';

export const fetchProvinces = async () => {
  const result = await fetchWithCache(
    'provinces',
    async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.provinces);
      return response.data;
    },
    CACHE_DURATION * 6
  );
  return {
    status: 'success',
    data: (result?.data || []).map((p) => ({
      id: p.id,
      name: p.name,
      area_code: p.area_code,
    })),
  };
};

export const fetchCities = async (provinceId) => {
  const result = await fetchWithCache(
    `cities_${provinceId}`,
    async () => {
      const response = await axiosInstance.get(`${API_ENDPOINTS.provinces}/${provinceId}/cities`);
      return response.data;
    },
    CACHE_DURATION * 6
  );
  return {
    status: 'success',
    data: (result?.data || []).map((c) => ({
      id: c.id,
      name: c.name,
      province_id: c.province_id,
    })),
  };
};
