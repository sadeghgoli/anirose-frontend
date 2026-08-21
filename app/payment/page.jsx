import { Suspense } from "react";
import PaymentPage from "../../src/components/payment/paymentPage.jsx";
import JsonLd from "../../src/components/JsonLd";
import { defaultOgImage } from "../../src/utils/seo";

export const metadata = {
  title: "پرداخت | آنی رز",
  description: "پرداخت آنلاین و امن سفارش در آنی رز - درگاه پرداخت مستقیم",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "پرداخت | آنی رز",
    description: "پرداخت آنلاین و امن سفارش در آنی رز",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "پرداخت آنی رز",
  description: "پرداخت آنلاین سفارش",
  url: "https://aniroseco.ir/payment",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroseco.ir/#website" },
};

export default function Payment() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><p className="text-gray-500">در حال بارگذاری...</p></div>}>
        <PaymentPage />
      </Suspense>
    </>
  );
}