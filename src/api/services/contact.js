import axiosInstance from '../axios.js';
import { API_ENDPOINTS, CACHE_DURATION } from '../config.js';
import { fetchWithCache } from '../cache.js';

export const fetchContactSettings = async () => {
  try {
    const response = await fetchWithCache('contact-settings', () =>
      axiosInstance.get(API_ENDPOINTS.contactSettings).then((r) => r.data),
      CACHE_DURATION
    );
    return response?.data || null;
  } catch {
    return null;
  }
};
