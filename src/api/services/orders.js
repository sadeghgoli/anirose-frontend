import axiosInstance from '../axios.js';
import { API_ENDPOINTS } from '../config.js';

const mapOrderItem = (item) => ({
  id: item.id,
  cart_item_id: item.id,
  product_id: item.product_id,
  product_name: item.product_name,
  name: item.product_name,
  product_code: item.product_code,
  product_image: item.product_image,
  image: item.product_image,
  quantity: item.quantity,
  unit_price: item.unit_price,
  price: item.unit_price,
  discount_percent: item.discount_percent || 0,
  discount_amount: item.discount_amount || 0,
  final_price: item.final_price,
  subtotal: item.final_price || item.unit_price * item.quantity,
  product_options: item.product_options || {},
});

const mapOrder = (order) => ({
  id: order.id,
  order_id: order.id,
  order_number: order.order_number || '',
  source: order.source || 'site',
  total_amount: order.total_amount || 0,
  subtotal: order.total_amount || 0,
  shipping_fee: order.shipping_fee || 0,
  shipping_cost: order.shipping_cost || 0,
  insurance_cost: order.insurance_cost || 0,
  discount_amount: order.discount_amount || 0,
  final_amount: order.final_amount || 0,
  total: order.final_amount || 0,
  total_weight: order.total_weight || 0,
  shipping_status: order.shipping_status || '',
  shipping_status_label: order.shipping_status_label || '',
  payment_status: order.payment_status || '',
  payment_status_label: order.payment_status_label || '',
  payment_method: order.payment_method || '',
  shipping_method: order.shipping_method || '',
  shipping_address: order.shipping_address || '',
  shipping_city: order.shipping_city || '',
  shipping_state: order.shipping_state || '',
  shipping_postal_code: order.shipping_postal_code || '',
  shipping_recipient_name: order.shipping_recipient_name || '',
  shipping_phone: order.shipping_phone || '',
  shipping_tracking_code: order.shipping_tracking_code || '',
  notes: order.notes || '',
  items_count: order.items_count || (order.items || []).length,
  items: (order.items || []).map(mapOrderItem),
  histories: (order.histories || []).map((h) => ({
    id: h.id,
    status: h.status,
    note: h.note,
    created_at: h.created_at,
  })),
  created_at: order.created_at || '',
  updated_at: order.updated_at || '',
});

export const fetchOrders = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.orders);
  const data = response.data?.data || [];
  return {
    orders: data.map(mapOrder),
    meta: response.data?.meta || null,
  };
};

export const fetchOrderById = async (id) => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.orders}/${id}`);
  return response.data?.data ? mapOrder(response.data.data) : null;
};

export const placeOrder = async (orderData) => {
  const response = await axiosInstance.post(API_ENDPOINTS.orders, orderData);
  return response.data;
};

export const cancelOrder = async (id) => {
  const response = await axiosInstance.post(`${API_ENDPOINTS.orders}/${id}/cancel`);
  return response.data;
};

export const initiateOrderPayment = async (orderId) => {
  const response = await axiosInstance.post(`${API_ENDPOINTS.orders}/${orderId}/pay`);
  return response.data;
};
