import axios from 'axios';
import { API_BASE_URL } from './config.js';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

const handleUnauthorized = () => {
  localStorage.removeItem('authToken');
  sessionStorage.removeItem('authToken');

  import('../utils/helpers/cookie.js').then(({ removeCookie }) => {
    removeCookie('token');
  }).catch(() => {});

  import('../store/index.js').then(({ default: useStore }) => {
    useStore.getState().clearAuth();
  }).catch(() => {});

  const currentPath = window.location.pathname;
  if (currentPath !== '/login') {
    window.location.href = '/login';
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      if (status === 401) {
        handleUnauthorized();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
