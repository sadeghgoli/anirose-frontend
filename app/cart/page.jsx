import Cart from '../../src/views/Cart/Cart.jsx'
import JsonLd from '../../src/components/JsonLd'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "سبد خرید | آنی رز",
  description: "سبد خرید آنی رز - مشاهده و مدیریت محصولات انتخاب شده برای خرید",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "سبد خرید | آنی رز",
    description: "سبد خرید آنی رز - مشاهده و مدیریت محصولات انتخاب شده",
    images: [defaultOgImage],
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "سبد خرید آنی رز",
  description: "سبد خرید آنی رز - مشاهده و مدیریت محصولات انتخاب شده برای خرید",
  url: "https://aniroseco.ir/cart",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroseco.ir/#website" },
};

export default function CartPage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <Cart />
    </>
  );
}
