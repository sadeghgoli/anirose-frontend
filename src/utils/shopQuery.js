const SORT_VALUES = ['default', 'newest', 'oldest', 'price_asc', 'price_desc'];

const uniqueCategoryIds = (ids) => (
  [...new Set((ids || []).map(Number).filter((id) => Number.isInteger(id) && id > 0))]
    .sort((a, b) => a - b)
);

const parsePrice = (value) => {
  if (value == null || value === '') return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.floor(n);
};

const parsePage = (value) => {
  const n = Number(value);
  if (!Number.isInteger(n) || n < 1) return 1;
  return n;
};

export const parseShopQuery = (searchParams) => {
  const categories = uniqueCategoryIds(searchParams.getAll('category'));
  let minPrice = parsePrice(searchParams.get('min_price'));
  let maxPrice = parsePrice(searchParams.get('max_price'));
  if (minPrice != null && maxPrice != null && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  const sortRaw = searchParams.get('sort_by') || searchParams.get('sort') || 'default';
  const sortBy = SORT_VALUES.includes(sortRaw) ? sortRaw : 'default';
  const searchTerm = (searchParams.get('q') || '').trim();
  const page = parsePage(searchParams.get('page'));

  return { categories, minPrice, maxPrice, sortBy, searchTerm, page };
};

export const serializeShopQuery = ({
  categories = [],
  minPrice = null,
  maxPrice = null,
  sortBy = 'default',
  searchTerm = '',
  page = 1,
} = {}) => {
  const params = new URLSearchParams();
  uniqueCategoryIds(categories).forEach((id) => params.append('category', String(id)));
  const q = (searchTerm || '').trim();
  if (q) params.set('q', q);
  if (minPrice != null) params.set('min_price', String(minPrice));
  if (maxPrice != null) params.set('max_price', String(maxPrice));
  if (sortBy && sortBy !== 'default' && SORT_VALUES.includes(sortBy)) {
    params.set('sort_by', sortBy);
  }
  if (page > 1) params.set('page', String(page));
  return params;
};

export const shopQueryString = (state) => {
  const qs = serializeShopQuery(state).toString();
  return qs ? `?${qs}` : '';
};

export const shopHref = (state, pathname = '/shop') => `${pathname}${shopQueryString(state)}`;

export const SORT_OPTIONS = [
  { value: 'default', label: 'پیش‌فرض' },
  { value: 'newest', label: 'جدیدترین' },
  { value: 'oldest', label: 'قدیمی‌ترین' },
  { value: 'price_asc', label: 'ارزان‌ترین' },
  { value: 'price_desc', label: 'گران‌ترین' },
];
