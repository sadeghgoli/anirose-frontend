import Root from "../src/views/Root/Root";
import JsonLd from "../src/components/JsonLd";
import { defaultOgImage } from "../src/utils/seo";

export const metadata = {
  title: "آنی رز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک",
  description: "فروشگاه اینترنتی آنی رز - مرجع تخصصی خرید محصولات طبیعی، ارگانیک و سلامت محور با بهترین قیمت و کیفیت در ایران",
  alternates: {
    canonical: "https://aniroz.ir",
  },
  openGraph: {
    title: "آنی رز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک",
    description: "فروشگاه اینترنتی آنی رز - مرجع تخصصی خرید محصولات طبیعی، ارگانیک و سلامت محور",
    url: "https://aniroz.ir",
    images: [defaultOgImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "آنی رز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک",
    description: "فروشگاه اینترنتی آنی رز - خرید انواع محصولات طبیعی و ارگانیک با بهترین قیمت",
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://aniroz.ir/#webpage",
  name: "آنی رز | فروشگاه محصولات طبیعی و ارگانیک",
  description: "فروشگاه اینترنتی آنی رز - مرجع تخصصی خرید محصولات طبیعی، ارگانیک و سلامت محور در ایران",
  url: "https://aniroz.ir",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
  about: { "@id": "https://aniroz.ir/#store" },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={webPageJsonLd} />
      <Root />
    </>
  );
}
