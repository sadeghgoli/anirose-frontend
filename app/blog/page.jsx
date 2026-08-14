import JsonLd from "../../src/components/JsonLd";
import BlogPageClient from "../../src/components/blog/blogPage.jsx";
import { serverFetch } from "../../src/utils/api/serverApi.js";
import { defaultOgImage } from "../../src/utils/seo";

export const revalidate = 40;

async function fetchPostsForJsonLd() {
  const json = await serverFetch('articles?per_page=50');
  return (json?.data || []).map((a) => ({
    id: a.id,
    title: a.title || '',
    slug: a.slug || '',
    excerpt: a.excerpt || '',
    image: a.featured_image || a.image || '/images/test/placeholder.jpg',
    category: { name: a.category?.name || a.category?.title || 'عمومی' },
    published_at: a.published_at || a.created_at || '',
  }));
}

export const metadata = {
  title: "وبلاگ | آنی رز",
  description: "مقالات و مطالب آموزشی آنی رز درباره تغذیه سالم، گیاهان دارویی و محصولات ارگانیک",
  alternates: {
    canonical: "https://aniroz.ir/blog",
  },
  openGraph: {
    title: "وبلاگ | آنی رز",
    description: "مقالات آموزشی درباره تغذیه سالم و محصولات ارگانیک",
    url: "https://aniroz.ir/blog",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "وبلاگ | آنی رز",
    description: "مقالات و مطالب آموزشی درباره تغذیه سالم و محصولات ارگانیک",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroz.ir" },
    { "@type": "ListItem", position: 2, name: "وبلاگ", item: "https://aniroz.ir/blog" },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "وبلاگ آنی رز",
  description: "مقالات آموزشی درباره تغذیه سالم و محصولات ارگانیک",
  url: "https://aniroz.ir/blog",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

export default async function BlogPage() {
  const posts = await fetchPostsForJsonLd();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://aniroz.ir/blog#blog",
    name: "وبلاگ آنی رز",
    description: "مقالات و مطالب آموزشی آنی رز درباره تغذیه سالم، گیاهان دارویی و محصولات ارگانیک",
    url: "https://aniroz.ir/blog",
    inLanguage: "fa-IR",
    publisher: { "@id": "https://aniroz.ir/#store" },
    isPartOf: { "@id": "https://aniroz.ir/#website" },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `https://aniroz.ir/blog/${p.id}/${p.slug}`,
      image: p.image ? p.image : undefined,
    })),
  };

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "مقالات وبلاگ آنی رز",
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `https://aniroz.ir/blog/${p.id}/${p.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={blogJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <BlogPageClient initialPosts={posts} />
    </>
  );
}
