import axiosInstance from '../axios.js';
import { API_ENDPOINTS } from '../config.js';

export const validateDiscountCode = async (code, type = 'discount', totalAmount = 0) => {
  try {
    const response = await axiosInstance.post(API_ENDPOINTS.discountValidate, {
      code,
      type,
      total_amount: totalAmount,
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 422) {
      return error.response.data;
    }
    throw error;
  }
};
