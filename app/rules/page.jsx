import JsonLd from "../../src/components/JsonLd";
import { defaultOgImage } from "../../src/utils/seo";

export const metadata = {
  title: "قوانین و مقررات | آنی رز",
  description: "قوانین و مقررات فروشگاه آنی رز - شرایط ثبت سفارش، پرداخت، ارسال و بازگشت کالا",
  alternates: {
    canonical: "https://aniroz.ir/rules",
  },
  openGraph: {
    title: "قوانین و مقررات | آنی رز",
    description: "قوانین و مقررات فروشگاه آنی رز",
    images: [defaultOgImage],
  },
};

const rulesJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "قوانین و مقررات آنی رز",
  url: "https://aniroz.ir/rules",
  inLanguage: "fa-IR",
  isPartOf: { "@id": "https://aniroz.ir/#website" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroz.ir" },
    { "@type": "ListItem", position: 2, name: "قوانین و مقررات", item: "https://aniroz.ir/rules" },
  ],
};

const sections = [
  {
    title: "ثبت سفارش",
    body: "پس از ثبت سفارش، پیامک تأیید برای شما ارسال می‌شود. در صورت عدم موجودی محصول، هماهنگی لازم با شما انجام خواهد شد.",
  },
  {
    title: "پرداخت",
    body: "پرداخت به صورت آنلاین و از طریق درگاه‌های معتبر بانکی انجام می‌شود. اطلاعات پرداخت شما به صورت امن و رمزنگاری‌شده منتقل می‌گردد.",
  },
  {
    title: "ارسال سفارش",
    body: "سفارش‌ها در بازه ۲ تا ۵ روز کاری پس از تأیید پرداخت، برای سراسر کشور ارسال می‌شوند. کد رهگیری پس از ارسال برای شما پیامک خواهد شد.",
  },
  {
    title: "بازگشت کالا",
    body: "تا ۷ روز پس از دریافت سفارش، در صورت وجود مغایرت یا مشکل، امکان بازگشت کالا وجود دارد.",
  },
  {
    title: "حریم خصوصی",
    body: "اطلاعات شخصی شما صرفاً برای پردازش سفارش استفاده شده و در اختیار اشخاص ثالث قرار نمی‌گیرد.",
  },
];

export default function RulesPage() {
  return (
    <>
      <JsonLd data={rulesJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="min-h-[60vh] bg-[#F8F9FB] py-10">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0c5505] mb-6 text-center">قوانین و مقررات</h1>
          <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-10 space-y-6">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-bold text-gray-800 mb-2">{s.title}</h2>
                <p className="text-gray-500 text-sm leading-7">{s.body}</p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
