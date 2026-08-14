import AboutPageContent from "../../src/components/about";
import JsonLd from "../../src/components/JsonLd";
import { defaultOgImage } from "../../src/utils/seo";

export const metadata = {
  title: "درباره ما | آنی رز",
  description: "آشنایی با فروشگاه اینترنتی آنی رز - مرجع تخصصی محصولات طبیعی و ارگانیک با هدف سلامتی و کیفیت زندگی",
  alternates: {
    canonical: "https://aniroseco.ir/about",
  },
  openGraph: {
    title: "درباره ما | آنی رز",
    description: "آشنایی با فروشگاه اینترنتی آنی رز",
    images: [defaultOgImage],
  },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "درباره آنی رز",
  description: "آشنایی با فروشگاه اینترنتی آنی رز",
  url: "https://aniroseco.ir/about",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroseco.ir/#website" },
  about: { "@type": "Organization", name: "آنی رز", url: "https://aniroseco.ir" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroseco.ir" },
    { "@type": "ListItem", position: 2, name: "درباره ما", item: "https://aniroseco.ir/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <AboutPageContent />
    </>
  );
}
