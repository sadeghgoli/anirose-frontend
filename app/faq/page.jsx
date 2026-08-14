import JsonLd from "../../src/components/JsonLd";
import { defaultOgImage } from "../../src/utils/seo";

export const metadata = {
  title: "سوالات متداول | آنی رز",
  description: "پاسخ به سوالات متداول درباره خرید، ارسال، پرداخت و بازگشت کالا از فروشگاه آنی رز",
  alternates: {
    canonical: "https://aniroz.ir/faq",
  },
  openGraph: {
    title: "سوالات متداول | آنی رز",
    description: "پاسخ به سوالات متداول درباره خرید از آنی رز",
    images: [defaultOgImage],
  },
};

const faqs = [
  {
    question: "چگونه می‌توانم سفارش خود را ثبت کنم؟",
    answer: "برای ثبت سفارش کافی است محصول مورد نظر خود را از فروشگاه انتخاب و به سبد خرید اضافه کنید، سپس مراحل تسویه حساب را طی کرده و اطلاعات ارسال را وارد نمایید.",
  },
  {
    question: "روش‌های پرداخت چیست؟",
    answer: "پرداخت آنلاین از طریق درگاه بانکی انجام می‌شود. همچنین امکان پرداخت در محل برای برخی مناطق فراهم است.",
  },
  {
    question: "هزینه و زمان ارسال چگونه است؟",
    answer: "سفارش‌ها از طریق پست و تیپاکس برای سراسر کشور ارسال می‌شوند. هزینه ارسال بر اساس مقصد محاسبه و زمان تحویل معمولاً ۲ تا ۵ روز کاری است.",
  },
  {
    question: "آیا امکان بازگشت کالا وجود دارد؟",
    answer: "بله، تا ۷ روز پس از دریافت سفارش در صورت وجود مشکل می‌توانید نسبت به بازگشت کالا اقدام کنید.",
  },
  {
    question: "آیا محصولات آنی رز ارگانیک هستند؟",
    answer: "محصولات عرضه‌شده از تأمین‌کنندگان معتبر انتخاب شده و از نظر کیفیت کنترل می‌شوند. توضیحات دقیق هر محصول در صفحه آن ارائه شده است.",
  },
  {
    question: "چگونه می‌توانم با پشتیبانی تماس بگیرم؟",
    answer: "شما می‌توانید از طریق صفحه تماس با ما، تلفن پشتیبانی و ایمیل در ساعات کاری با تیم پشتیبانی آنی رز در ارتباط باشید.",
  },
];

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroz.ir" },
    { "@type": "ListItem", position: 2, name: "سوالات متداول", item: "https://aniroz.ir/faq" },
  ],
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <div className="min-h-[60vh] bg-[#F8F9FB] py-10">
        <div className="max-w-[900px] mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0c5505] mb-6 text-center">سوالات متداول</h1>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.question} className="bg-white rounded-2xl shadow-sm p-5 group">
                <summary className="cursor-pointer font-semibold text-gray-800 list-none flex items-center justify-between">
                  {f.question}
                  <span className="text-[#64a39a] text-lg group-open:hidden">+</span>
                  <span className="text-[#64a39a] text-lg hidden group-open:inline">−</span>
                </summary>
                <p className="mt-3 text-gray-500 text-sm leading-7">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
