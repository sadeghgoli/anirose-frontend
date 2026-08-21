import axiosInstance from '../axios.js';
import { API_ENDPOINTS, CACHE_DURATION } from '../config.js';
import { fetchWithCache, invalidateCache } from '../cache.js';

const mapCity = (c) => ({
  id: c.id,
  name: c.name,
  province_id: c.province_id,
});

const mapProvince = (p) => ({
  id: p.id,
  name: p.name,
  area_code: p.area_code,
  cities: Array.isArray(p.cities) ? p.cities.map(mapCity) : [],
});

const unwrapCities = (payload) => {
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.cities)) return payload.cities;
  if (Array.isArray(payload)) return payload;
  return [];
};

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
    data: (result?.data || []).map(mapProvince),
  };
};

export const fetchCities = async (provinceId) => {
  if (!provinceId) {
    return { status: 'success', data: [] };
  }

  invalidateCache(`cities_${provinceId}`);

  const response = await axiosInstance.get(`${API_ENDPOINTS.provinces}/${provinceId}/cities`);
  const list = unwrapCities(response.data);

  return {
    status: 'success',
    data: list.map(mapCity),
  };
};
