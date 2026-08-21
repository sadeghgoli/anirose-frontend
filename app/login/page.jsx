import Login from '../../src/views/Login/Login.jsx'
import JsonLd from '../../src/components/JsonLd'
import GuestRoute from '../../src/components/common/GuestRoute'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "ورود | آنی رز",
  description: "ورود به حساب کاربری آنی رز - احراز هویت و دسترسی به پنل کاربری",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "ورود | آنی رز",
    description: "ورود به حساب کاربری آنی رز",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ورود به آنی رز",
  description: "ورود به حساب کاربری",
  url: "https://aniroseco.ir/login",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroseco.ir/#website" },
};

export default function LoginPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <GuestRoute>
        <Login />
      </GuestRoute>
    </>
  );
}
