import Checkout from '../../src/views/Checkout/Checkout.jsx'
import JsonLd from '../../src/components/JsonLd'
import ProtectedRoute from '../../src/components/common/ProtectedRoute'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "تسویه حساب | آنی رز",
  description: "تسویه حساب و نهایی سازی سفارش در آنی رز - اطلاعات حمل و نقل و پرداخت",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "تسویه حساب | آنی رز",
    description: "تسویه حساب و نهایی سازی سفارش در آنی رز",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "تسویه حساب آنی رز",
  description: "تسویه حساب و نهایی سازی سفارش",
  url: "https://aniroz.ir/checkout",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

export default function CheckoutPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    </>
  );
}
