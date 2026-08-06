import axiosInstance from '../axios.js';
import { API_ENDPOINTS, CACHE_DURATION } from '../config.js';
import { fetchWithCache } from '../cache.js';

export const fetchTypeOfWeights = async () => {
  const response = await fetchWithCache('type-of-weights', () =>
    axiosInstance.get(API_ENDPOINTS.typeOfWeights).then((r) => r.data),
    CACHE_DURATION
  );
  return response;
};
