import BulkOrderPage from '../../src/components/bulkOrder/bulkOrderPage.jsx'
import JsonLd from '../../src/components/JsonLd'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "سفارش عمده | آنی رز",
  description: "سفارش عمده محصولات طبیعی و ارگانیک آنی رز - خرید با تخفیف ویژه برای فروشندگان و کسب و کارها",
  alternates: {
    canonical: "https://aniroz.ir/omde",
  },
  openGraph: {
    title: "سفارش عمده | آنی رز",
    description: "سفارش عمده محصولات طبیعی و ارگانیک آنی رز",
    images: [defaultOgImage],
  },
};

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "سفارش عمده آنی رز",
  description: "خرید عمده محصولات طبیعی و ارگانیک با تخفیف ویژه برای فروشندگان و کسب و کارها",
  provider: { "@type": "Organization", name: "آنی رز", url: "https://aniroz.ir" },
  areaServed: "IR",
  serviceType: "Bulk Order",
  category: "Bulk Order",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroz.ir" },
    { "@type": "ListItem", position: 2, name: "سفارش عمده", item: "https://aniroz.ir/omde" },
  ],
};

export default function OmdePage() {
  return (
    <>
      <JsonLd data={businessJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <BulkOrderPage />
    </>
  );
}