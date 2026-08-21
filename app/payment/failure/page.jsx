import { Suspense } from "react";
import PaymentPage from "../../../src/components/payment/paymentPage.jsx";
import JsonLd from "../../../src/components/JsonLd";
import { defaultOgImage } from "../../../src/utils/seo";

export const metadata = {
  title: "پرداخت ناموفق | آنی رز",
  description: "نتیجه ناموفق پرداخت سفارش در فروشگاه آنی رز",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "پرداخت ناموفق | آنی رز",
    description: "نتیجه ناموفق پرداخت سفارش در فروشگاه آنی رز",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "پرداخت ناموفق آنی رز",
  description: "نتیجه ناموفق پرداخت سفارش",
  url: "https://aniroseco.ir/payment/failure",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroseco.ir/#website" },
};

export default function PaymentFailurePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">در حال بررسی پرداخت...</p></div>}>
        <PaymentPage />
      </Suspense>
    </>
  );
}
