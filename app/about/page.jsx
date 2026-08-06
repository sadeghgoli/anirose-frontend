import JsonLd from "../../src/components/JsonLd";
import { defaultOgImage } from "../../src/utils/seo";

export const metadata = {
  title: "درباره ما | آنی روز",
  description: "آشنایی با فروشگاه اینترنتی آنی روز - مرجع تخصصی محصولات طبیعی و ارگانیک با هدف سلامتی و کیفیت زندگی",
  alternates: {
    canonical: "https://aniroz.ir/about",
  },
  openGraph: {
    title: "درباره ما | آنی روز",
    description: "آشنایی با فروشگاه اینترنتی آنی روز",
    images: [defaultOgImage],
  },
};

const aboutPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "درباره آنی روز",
  description: "آشنایی با فروشگاه اینترنتی آنی روز",
  url: "https://aniroz.ir/about",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
  about: { "@type": "Organization", name: "آنی روز", url: "https://aniroz.ir" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroz.ir" },
    { "@type": "ListItem", position: 2, name: "درباره ما", item: "https://aniroz.ir/about" },
  ],
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="min-h-[60vh] bg-[#F8F9FB] py-10">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0c5505] mb-6 text-center">درباره آنی روز</h1>
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 text-gray-600 leading-8 text-sm sm:text-base space-y-4">
            <p>
              فروشگاه اینترنتی «آنی روز» با هدف ارائه محصولات طبیعی، ارگانیک و سلامت‌محور به خانواده‌های ایرانی فعالیت خود را آغاز کرده است. ما بر این باوریم که سلامتی مهم‌ترین سرمایه هر انسان است و تغذیه طبیعی نقش کلیدی در آن دارد.
            </p>
            <p>
              محصولات عرضه‌شده در آنی روز با دقت از تأمین‌کنندگان معتبر انتخاب و از نظر کیفیت کنترل می‌شوند تا بتوانید با خیال راحت و در کمترین زمان، محصول مورد نیاز خود را در سراسر ایران دریافت کنید.
            </p>
            <p>
              تیم آنی روز متشکل از متخصصان تغذیه و سلامت است تا علاوه بر فروش، مشاوره تخصصی و پاسخگویی به سوالات شما در زمینه تغذیه سالم نیز ارائه شود.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
