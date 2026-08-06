import axiosInstance from '../axios.js';
import { API_ENDPOINTS, CACHE_DURATION } from '../config.js';
import { fetchWithCache } from '../cache.js';

const mapProduct = (p) => {
  const price = Number(p.price) || 0;
  const priceDiscounted = p.price_discounted ? Number(p.price_discounted) : null;
  return {
    id: p.id,
    name: p.title,
    slug: p.slug,
    tracking_code: p.tracking_code,
    categoryId: p.category_id,
    category: p.category ? {
      id: p.category.id,
      name: p.category.title,
      title: p.category.title,
      slug: p.category.slug,
      image: p.category.image,
    } : null,
    price: price,
    sale: !!priceDiscounted,
    salePrice: priceDiscounted,
    has_discount: !!p.has_discount || !!priceDiscounted,
    price_buy: Number(p.price_buy) || 0,
    stock: p.stock,
    status: p.status,
    suggested: p.suggested === 'active',
    description: p.description || '',
    mini_description: p.mini_description || '',
    shortDescription: p.mini_description || '',
    image: p.primary_image || '',
    primary_image: p.primary_image || '',
    images: (p.images || []).map((img) => ({
      id: img.id,
      url: img.url,
      sort_order: img.sort_order,
    })),
    type_of_weights: (p.type_of_weights || []).map((w) => ({
      id: w.id,
      title: w.title,
      weight: w.weight,
      pivot: w.pivot || {},
    })),
    rating: 0,
    reviewsCount: 0,
  };
};

export const fetchProducts = async (params = {}) => {
  const queryParams = {};
  if (params.page) queryParams.page = params.page;
  if (params.per_page) queryParams.per_page = params.per_page;
  if (params.category_id) queryParams.category_id = params.category_id;
  if (params.search) queryParams.search = params.search;
  if (params.suggested) queryParams.suggested = params.suggested ? '1' : undefined;
  if (params.sort) queryParams.sort = params.sort;

  const key = `products_${JSON.stringify(queryParams)}`;
  const data = await fetchWithCache(key, async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.products, { params: queryParams });
    return response.data;
  }, CACHE_DURATION);

  return {
    products: (data?.data || []).map(mapProduct),
    meta: data?.meta || { current_page: 1, last_page: 1, per_page: 12, total: 0 },
  };
};

export const fetchProductById = async (id) => {
  const data = await fetchWithCache(`product_${id}`, async () => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.products}/${id}`);
    return response.data;
  }, CACHE_DURATION);

  const productData = data?.data;
  if (!productData) return null;
  const product = mapProduct(productData);
  product.relatedProducts = (data?.related_products || []).map(mapProduct);
  product.has_discount = productData.has_discount || false;
  product.price_buy = productData.price_buy || 0;
  return product;
};

export const fetchFilteredProducts = async (filters = {}, page = 1, perPage = 12) => {
  const params = {
    page,
    per_page: perPage,
  };

  if (filters.searchTerm) params.search = filters.searchTerm;
  if (filters.categories && filters.categories.length > 0) {
    params.category_id = filters.categories[0];
  }
  if (filters.sortBy === 'price_asc') params.sort = 'price_asc';
  else if (filters.sortBy === 'price_desc') params.sort = 'price_desc';
  else if (filters.sortBy === 'newest') params.sort = 'newest';
  else if (filters.sortBy === 'oldest') params.sort = 'oldest';

  const result = await fetchProducts(params);

  let products = result.products;

  if (filters.minPrice) {
    products = products.filter((p) => {
      const val = parseInt(String(p.salePrice || p.price).replace(/,/g, ''));
      return val >= filters.minPrice;
    });
  }
  if (filters.maxPrice) {
    products = products.filter((p) => {
      const val = parseInt(String(p.salePrice || p.price).replace(/,/g, ''));
      return val <= filters.maxPrice;
    });
  }

  const meta = result.meta;
  return {
    products,
    total: meta.total || products.length,
    totalPages: meta.last_page || 1,
    currentPage: meta.current_page || page,
  };
};

export const fetchSaleProducts = async () => {
  const result = await fetchProducts({ suggested: true, per_page: 20 });
  return { data: { products: result.products } };
};

export const fetchCategoryProducts = async (categoryId) => {
  const result = await fetchProducts({ category_id: categoryId, per_page: 20 });
  return { data: result.products };
};

export const fetchAllProducts = async () => {
  const result = await fetchProducts({ per_page: 50 });
  return result.products;
};
