import axiosInstance from '../axios.js';
import { API_ENDPOINTS, CACHE_DURATION } from '../config.js';
import { fetchWithCache } from '../cache.js';

const mapArticle = (a) => ({
  id: a.id,
  title: a.title || '',
  slug: a.slug || '',
  excerpt: a.excerpt || '',
  image: a.featured_image || '',
  featured_image: a.featured_image || '',
  category_id: a.category_id,
  category: a.category ? {
    id: a.category.id,
    name: a.category.title,
    title: a.category.title,
    slug: a.category.slug,
  } : null,
  reading_minutes: a.reading_minutes || 0,
  view_count: a.view_count || 0,
  is_featured: a.is_featured || false,
  published_at: a.published_at || '',
  created_at: a.created_at || '',
  body: a.body || '',
  tags: (a.tags || []).map((t) => ({
    id: t.id,
    name: t.name,
    slug: t.slug,
  })),
  author: a.author || null,
  meta_title: a.meta_title,
  meta_description: a.meta_description,
  meta_keywords: a.meta_keywords,
});

export const fetchArticles = async (params = {}) => {
  const key = `articles_${JSON.stringify(params)}`;
  const result = await fetchWithCache(
    key,
    async () => {
      const response = await axiosInstance.get(API_ENDPOINTS.articles, { params });
      return response.data;
    },
    CACHE_DURATION
  );
  return {
    articles: (result?.data || []).map(mapArticle),
    meta: result?.meta || null,
  };
};

export const fetchArticleBySlug = async (slug) => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.articles}/${slug}`);
  const data = response.data?.data;
  if (!data) return null;
  const article = mapArticle(data);
  article.relatedArticles = (response.data?.related_articles || []).map(mapArticle);
  return article;
};
