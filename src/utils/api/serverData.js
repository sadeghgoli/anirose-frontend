import { serverFetch } from './serverApi.js';

const mapProduct = (p) => {
  const price = Number(p.price) || 0;
  const priceDiscounted = p.price_discounted ? Number(p.price_discounted) : null;
  return {
    id: p.id,
    name: p.title,
    slug: p.slug,
    price,
    sale: !!priceDiscounted,
    salePrice: priceDiscounted,
    stock: p.stock,
    image: p.primary_image || '',
  };
};

export async function getSaleProducts() {
  const json = await serverFetch('products?suggested=1&per_page=20');
  return (json?.data || []).map(mapProduct);
}

export async function getArticlesForSlider() {
  const json = await serverFetch('articles?per_page=20');
  return (json?.data || []).map((a) => ({
    id: a.id,
    title: a.title || '',
    slug: a.slug || '',
    image: a.featured_image || a.image || '/images/test/placeholder.jpg',
  }));
}
