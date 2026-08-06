import { Suspense } from "react";
import JsonLd from "../../src/components/JsonLd";
import BlogList from "../../src/components/blog/BlogList";
import BlogSkeleton from "../../src/components/skeleton/Blog/BlogSkeleton.jsx";
import { defaultOgImage } from "../../src/utils/seo";

export const revalidate = 40;

export const metadata = {
  title: "وبلاگ | آنی روز",
  description: "مقالات و مطالب آموزشی آنی روز درباره تغذیه سالم، گیاهان دارویی و محصولات ارگانیک",
  alternates: {
    canonical: "https://aniroz.ir/blog",
  },
  openGraph: {
    title: "وبلاگ | آنی روز",
    description: "مقالات آموزشی درباره تغذیه سالم و محصولات ارگانیک",
    url: "https://aniroz.ir/blog",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "وبلاگ | آنی روز",
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

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://aniroz.ir/blog#blog",
  name: "وبلاگ آنی روز",
  description: "مقالات و مطالب آموزشی آنی روز درباره تغذیه سالم، گیاهان دارویی و محصولات ارگانیک",
  url: "https://aniroz.ir/blog",
  inLanguage: "fa-IR",
  publisher: { "@id": "https://aniroz.ir/#store" },
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "وبلاگ آنی روز",
  description: "مقالات آموزشی درباره تغذیه سالم و محصولات ارگانیک",
  url: "https://aniroz.ir/blog",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

export default async function BlogPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={blogJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <Suspense fallback={<BlogSkeleton />}>
        <BlogList />
      </Suspense>
    </>
  );
}
