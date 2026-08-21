import Contact from "../../src/views/Contact/Contact.jsx";
import JsonLd from "../../src/components/JsonLd";
import { defaultOgImage } from "../../src/utils/seo";

export const metadata = {
  title: "تماس با ما | آنی رز",
  description: "راه‌های ارتباط با فروشگاه آنی رز - تلفن، ایمیل و آدرس برای پشتیبانی و مشاوره خرید",
  alternates: {
    canonical: "https://aniroseco.ir/contact",
  },
  openGraph: {
    title: "تماس با ما | آنی رز",
    description: "راه‌های ارتباط با فروشگاه آنی رز",
    images: [defaultOgImage],
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "تماس با آنی رز",
  description: "راه‌های ارتباط با فروشگاه آنی رز",
  url: "https://aniroseco.ir/contact",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroseco.ir/#website" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroseco.ir" },
    { "@type": "ListItem", position: 2, name: "تماس با ما", item: "https://aniroseco.ir/contact" },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Contact />
    </>
  );
}
