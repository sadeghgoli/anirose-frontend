import axiosInstance, { setAuthToken } from '../axios.js';
import { API_ENDPOINTS, CACHE_DURATION } from '../config.js';
import { fetchWithCache, invalidateCache } from '../cache.js';

export const sendOtp = async (mobile) => {
  const response = await axiosInstance.post(API_ENDPOINTS.auth.sendOtp, { mobile });
  return response.data;
};

export const verifyOtp = async (mobile, otp) => {
  const response = await axiosInstance.post(API_ENDPOINTS.auth.verifyOtp, { mobile, otp });
  if (response.data?.token) {
    setAuthToken(response.data.token);
  }
  invalidateCache('profile');
  return response.data;
};

export const logout = async () => {
  try {
    await axiosInstance.post(API_ENDPOINTS.auth.logout);
  } catch {
    void 0;
  }
  setAuthToken(null);
  invalidateCache('profile');
};

export const fetchProfile = async () => {
  return fetchWithCache(
    'profile',
    async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.auth.profile);
      return response.data;
    },
    CACHE_DURATION
  );
};

export const updateProfile = async (data) => {
  const response = await axiosInstance.put(API_ENDPOINTS.auth.profile, data);
  invalidateCache('profile');
  return response.data;
};

export const validateToken = async () => {
  try {
    await axiosInstance.get(API_ENDPOINTS.auth.profile);
    return true;
  } catch {
    return false;
  }
};
