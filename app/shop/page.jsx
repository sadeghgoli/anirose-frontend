import { Suspense } from "react";
import Shop from "../../src/views/Shop/Shop.jsx";
import JsonLd from "../../src/components/JsonLd";
import { serverFetch } from "../../src/utils/api/serverApi";
import { defaultOgImage } from "../../src/utils/seo";

export const metadata = {
  title: "فروشگاه | آنی روز",
  description: "خرید آنلاین انواع محصولات طبیعی و ارگانیک از فروشگاه آنی روز - بهترین قیمت و کیفیت در سراسر ایران",
  alternates: {
    canonical: "https://aniroz.ir/shop",
  },
  openGraph: {
    title: "فروشگاه | آنی روز",
    description: "خرید آنلاین انواع محصولات طبیعی و ارگانیک از فروشگاه آنی روز",
    url: "https://aniroz.ir/shop",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "فروشگاه | آنی روز",
    description: "خرید آنلاین انواع محصولات طبیعی و ارگانیک از فروشگاه آنی روز",
  },
};

export const revalidate = 40;

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://aniroseco.ir/backend/api/v1/";

async function fetchProductsForJsonLd() {
  try {
    const data = await serverFetch('products?per_page=24');
    return data?.data || [];
  } catch {
    return [];
  }
}

export default async function ShopPage() {
  const products = await fetchProductsForJsonLd();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroz.ir" },
      { "@type": "ListItem", position: 2, name: "فروشگاه", item: "https://aniroz.ir/shop" },
    ],
  };

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "فروشگاه آنی روز",
    description: "خرید آنلاین انواع محصولات طبیعی و ارگانیک",
    url: "https://aniroz.ir/shop",
    inLanguage: "fa-IR",
    isPartOf: { "@id": "https://aniroz.ir/#website" },
  };

  const itemListJsonLd = products.length
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "محصولات آنی روز",
        numberOfItems: products.length,
        itemListElement: products.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: p.title,
          url: `https://aniroz.ir/product/${p.id}/${p.slug || "product"}`,
          image: p.primary_image || undefined,
          offers: {
            "@type": "Offer",
            price: p.price_discounted ? String(Number(p.price_discounted)) : String(Number(p.price)),
            priceCurrency: "IRR",
            availability: Number(p.stock) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        })),
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={collectionJsonLd} />
      {itemListJsonLd && <JsonLd data={itemListJsonLd} />}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">در حال بارگذاری...</p></div>}>
        <Shop />
      </Suspense>
    </>
  );
}
