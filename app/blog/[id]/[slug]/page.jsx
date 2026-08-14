import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "../../../../src/components/JsonLd";
import { serverFetch } from "../../../../src/utils/api/serverApi.js";

const SITE_URL = "https://aniroz.ir";

export const revalidate = 40;

const mapArticle = (a) => ({
  id: a.id,
  title: a.title || '',
  slug: a.slug || '',
  excerpt: a.excerpt || '',
  body: a.body || '',
  image: a.featured_image || '',
  published_at: a.published_at || a.created_at || '',
  author: a.author || null,
  category: a.category
    ? { id: a.category.id, name: a.category.title || a.category.name, slug: a.category.slug }
    : null,
});

const formatDate = (iso) => {
  if (!iso) return "";
  try {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("fa-IR", { dateStyle: "long" }).format(date);
  } catch {
    return "";
  }
};

async function fetchArticle(slug) {
  const json = await serverFetch(`articles/${slug}`);
  return json?.data ? mapArticle(json.data) : null;
}

async function fetchRelatedArticles(slug, limit = 3) {
  const json = await serverFetch(`articles?per_page=50`);
  const list = (json?.data || []).map(mapArticle).filter((a) => a.slug !== slug);
  return list.slice(0, limit);
}

export async function generateStaticParams() {
  const json = await serverFetch('articles?per_page=50');
  return (json?.data || []).map((a) => ({ id: String(a.id), slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) {
    return { title: "مقاله | آنی رز", robots: { index: false } };
  }
  const canonical = `${SITE_URL}/blog/${article.id}/${article.slug}`;
  return {
    title: `${article.title} | آنی رز`,
    description: article.excerpt || article.title,
    alternates: { canonical },
    openGraph: {
      title: `${article.title} | آنی رز`,
      description: article.excerpt || article.title,
      url: canonical,
      type: "article",
      locale: "fa_IR",
      siteName: "آنی رز",
      images: article.image ? [{ url: article.image, alt: article.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | آنی رز`,
      description: article.excerpt || article.title,
      images: article.image ? [{ url: article.image, alt: article.title }] : [],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await fetchArticle(slug);
  if (!post) notFound();

  const canonical = `${SITE_URL}/blog/${post.id}/${post.slug}`;
  const publishedDate = post.published_at ? new Date(post.published_at).toISOString().slice(0, 10) : '';

  const blogPostingJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.image ? `${post.image}` : undefined,
    datePublished: publishedDate || undefined,
    dateModified: publishedDate || undefined,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : { "@type": "Organization", name: "آنی رز", url: SITE_URL },
    publisher: { "@type": "Organization", name: "آنی رز", url: SITE_URL },
    mainEntityOfPage: canonical,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "وبلاگ", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  const otherPosts = await fetchRelatedArticles(post.slug);

  return (
    <>
      <JsonLd data={blogPostingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="min-h-[60vh] bg-[#F8F9FB] py-8 sm:py-12">
        <article className="max-w-[800px] mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#64a39a] text-sm font-medium mb-6 hover:text-[#0C5505] transition-colors"
          >
            <span aria-hidden="true">→</span>
            بازگشت به وبلاگ
          </Link>

          <div className="relative h-64 sm:h-[420px] w-full rounded-3xl overflow-hidden mb-8 shadow-lg">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gray-200" />
            )}
          </div>

          <header className="mb-8">
            {post.category && (
              <span className="inline-block bg-[#0C5505] text-white text-xs font-medium px-4 py-1.5 rounded-full mb-4">
                {post.category.name}
              </span>
            )}
            <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 leading-relaxed mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-400 text-xs sm:text-sm">
              {formatDate(post.published_at) && (
                <span>تاریخ انتشار: {formatDate(post.published_at)}</span>
              )}
              {formatDate(post.published_at) && <span aria-hidden="true">•</span>}
              <span>{post.author?.name || "وبلاگ آنی رز"}</span>
            </div>
          </header>

          <div className="border-t border-gray-200 pt-8">
            {post.body ? (
              <div
                className="prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            ) : (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 text-base sm:text-lg leading-9 mb-6">
                  {post.excerpt ||
                    "در این مقاله از وبلاگ آنی رز به بررسی این موضوع پرداخته‌ایم. برای مطالعه مطالب بیشتر به بخش وبلاگ مراجعه کنید."}
                </p>
              </div>
            )}

            <div className="mt-10 bg-[#0C5505]/5 rounded-2xl p-6 sm:p-8 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-[#0C5505] mb-2">
                همین حالا خرید کنید
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-4">
                برای مشاهده محصولات طبیعی و ارگانیک، به فروشگاه آنی رز سر بزنید.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-[#0C5505] text-white text-sm sm:text-base font-medium px-8 py-3 rounded-xl hover:bg-[#0C5505]/90 transition-colors"
              >
                رفتن به فروشگاه
              </Link>
            </div>
          </div>
        </article>

        {otherPosts.length > 0 && (
          <section className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-14">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0C5505] mb-6 text-center">
              مطالب مرتبط
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.id}/${p.slug}`}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group"
                >
                  <div className="relative h-44 w-full">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-gray-800 font-semibold text-base leading-7 line-clamp-2">
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
