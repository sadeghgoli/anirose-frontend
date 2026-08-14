import Profile from '../../src/views/Profile/Profile.jsx'
import JsonLd from '../../src/components/JsonLd'
import ProtectedRoute from '../../src/components/common/ProtectedRoute'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "پروفایل | آنی رز",
  description: "پروفایل کاربری آنی رز - مدیریت اطلاعات شخصی، سفارشات و تنظیمات حساب",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "پروفایل | آنی رز",
    description: "پروفایل کاربری آنی رز",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "پروفایل کاربری آنی رز",
  description: "مدیریت حساب کاربری",
  url: "https://aniroseco.ir/profile",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroseco.ir/#website" },
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
