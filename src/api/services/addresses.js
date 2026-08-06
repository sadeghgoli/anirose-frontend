import axiosInstance from '../axios.js';
import { API_ENDPOINTS } from '../config.js';

const mapAddress = (a) => ({
  id: a.id,
  user_id: a.user_id,
  first_name: a.first_name,
  last_name: a.last_name,
  full_name: a.full_name,
  province_id: a.province_id,
  province_name: a.province_name,
  city_id: a.city_id,
  city_name: a.city_name,
  full_address: a.full_address,
  address: a.full_address,
  postal_code: a.postal_code,
  mobile: a.mobile,
  phone: a.mobile,
  is_default: a.is_default || false,
  is_active: a.is_active !== false,
});

export const fetchAddresses = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.addresses);
  return {
    status: 'success',
    data: (response.data?.data || []).map(mapAddress),
  };
};

export const createAddress = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.addresses, data);
  return response.data;
};

export const updateAddress = async (id, data) => {
  const response = await axiosInstance.put(`${API_ENDPOINTS.addresses}/${id}`, data);
  return response.data;
};

export const deleteAddress = async (id) => {
  const response = await axiosInstance.delete(`${API_ENDPOINTS.addresses}/${id}`);
  return response.data;
};

export const setDefaultAddress = async (id) => {
  const response = await axiosInstance.post(`${API_ENDPOINTS.addresses}/${id}/default`);
  return response.data;
};
