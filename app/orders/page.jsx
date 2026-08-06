import Orders from '../../src/views/Orders/Orders.jsx'
import JsonLd from '../../src/components/JsonLd'
import ProtectedRoute from '../../src/components/common/ProtectedRoute'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "سفارشات | آنی روز",
  description: "مشاهده و پیگیری سفارشات ثبت شده در آنی روز - وضعیت سفارش ها و جزئیات",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "سفارشات | آنی روز",
    description: "مشاهده و پیگیری سفارشات ثبت شده در آنی روز",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "سفارشات آنی روز",
  description: "مشاهده و پیگیری سفارشات",
  url: "https://aniroz.ir/orders",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

export default function OrdersPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <ProtectedRoute>
        <Orders />
      </ProtectedRoute>
    </>
  );
}
