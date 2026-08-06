import Profile from '../../src/views/Profile/Profile.jsx'
import JsonLd from '../../src/components/JsonLd'
import ProtectedRoute from '../../src/components/common/ProtectedRoute'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "پروفایل | آنی روز",
  description: "پروفایل کاربری آنی روز - مدیریت اطلاعات شخصی، سفارشات و تنظیمات حساب",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "پروفایل | آنی روز",
    description: "پروفایل کاربری آنی روز",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "پروفایل کاربری آنی روز",
  description: "مدیریت حساب کاربری",
  url: "https://aniroz.ir/profile",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

export default function ProfilePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    </>
  );
}
