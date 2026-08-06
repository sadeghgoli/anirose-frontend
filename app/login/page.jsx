import Login from '../../src/views/Login/Login.jsx'
import JsonLd from '../../src/components/JsonLd'
import GuestRoute from '../../src/components/common/GuestRoute'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "ورود | آنی روز",
  description: "ورود به حساب کاربری آنی روز - احراز هویت و دسترسی به پنل کاربری",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "ورود | آنی روز",
    description: "ورود به حساب کاربری آنی روز",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ورود به آنی روز",
  description: "ورود به حساب کاربری",
  url: "https://aniroz.ir/login",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
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
