import Addresses from '../../src/views/Addresses/Addresses.jsx'
import JsonLd from '../../src/components/JsonLd'
import ProtectedRoute from '../../src/components/common/ProtectedRoute'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "آدرس‌ها | آنی روز",
  description: "مدیریت آدرس‌های ارسال سفارش در آنی روز - افزودن و ویرایش آدرس‌ها",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "آدرس‌ها | آنی روز",
    description: "مدیریت آدرس‌های ارسال سفارش",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "آدرس‌های من",
  description: "مدیریت آدرس‌های ارسال",
  url: "https://aniroz.ir/addresses",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

export default function AddressesPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <ProtectedRoute>
        <Addresses />
      </ProtectedRoute>
    </>
  );
}
