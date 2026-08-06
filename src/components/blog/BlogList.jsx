import Link from "next/link";
import Image from "next/image";
import JsonLd from "../JsonLd";
import { serverFetch } from "../../utils/api/serverApi.js";

async function fetchArticles() {
  const json = await serverFetch('articles?per_page=50');
  return (json?.data || []).map((a) => ({
    id: a.id,
    title: a.title || '',
    slug: a.slug || '',
    excerpt: a.excerpt || '',
    image: a.featured_image || '',
    published_at: a.published_at || a.created_at || '',
  }));
}

export default async function BlogList() {
  const posts = await fetchArticles();

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "وبلاگ آنی روز",
    description: "مقالات و مطالب آموزشی آنی روز",
    url: "https://aniroz.ir/blog",
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
    name: "مقالات وبلاگ آنی روز",
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
      <JsonLd data={blogJsonLd} />
      <JsonLd data={itemListJsonLd} />
      <div className="min-h-[60vh] bg-[#F8F9FB] py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0c5505] mb-8 text-center">وبلاگ آنی روز</h1>
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-semibold text-gray-700 mb-2">مجله‌ای وجود ندارد</p>
              <p className="text-gray-500">به زودی مقالات جدیدی منتشر خواهیم کرد</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}/${post.slug}`} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative h-48 w-full">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="text-gray-800 font-semibold text-base leading-7 line-clamp-2">{post.title}</h2>
                    <span className="inline-block mt-3 bg-[#0c5505] text-white text-xs font-medium px-4 py-1.5 rounded-lg">
                      مشاهده مقاله
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
