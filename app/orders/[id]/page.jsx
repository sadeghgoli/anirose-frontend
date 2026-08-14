import OrderDetail from '../../../src/views/OrderDetail/OrderDetail.jsx'
import JsonLd from '../../../src/components/JsonLd'
import ProtectedRoute from '../../../src/components/common/ProtectedRoute'

export const metadata = {
  title: "جزئیات سفارش | آنی رز",
  description: "مشاهده جزئیات کامل سفارش در آنی رز - وضعیت پرداخت و ارسال",
  robots: {
    index: false,
    follow: false,
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "جزئیات سفارش",
  description: "جزئیات سفارش آنی رز",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

export default async function OrderDetailPage({ params }) {
  const { id } = await params;

  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <ProtectedRoute>
        <OrderDetail id={id} />
      </ProtectedRoute>
    </>
  );
}
