import Contact from "../../src/views/Contact/Contact.jsx";
import JsonLd from "../../src/components/JsonLd";
import { defaultOgImage } from "../../src/utils/seo";

export const metadata = {
  title: "تماس با ما | آنی روز",
  description: "راه‌های ارتباط با فروشگاه آنی روز - تلفن، ایمیل و آدرس برای پشتیبانی و مشاوره خرید",
  alternates: {
    canonical: "https://aniroz.ir/contact",
  },
  openGraph: {
    title: "تماس با ما | آنی روز",
    description: "راه‌های ارتباط با فروشگاه آنی روز",
    images: [defaultOgImage],
  },
};

const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "تماس با آنی روز",
  description: "راه‌های ارتباط با فروشگاه آنی روز",
  url: "https://aniroz.ir/contact",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroz.ir" },
    { "@type": "ListItem", position: 2, name: "تماس با ما", item: "https://aniroz.ir/contact" },
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
