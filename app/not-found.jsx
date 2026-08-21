import Link from "next/link";
import JsonLd from "../src/components/JsonLd";

export const metadata = {
  title: "صفحه پیدا نشد | آنی رز",
  description: "صفحه مورد نظر شما در آنی رز یافت نشد",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB]">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "صفحه پیدا نشد - آنی رز",
        description: "صفحه مورد نظر شما یافت نشد",
      }} />
      <div className="text-center px-4">
        <h1 className="text-8xl font-bold text-[#64a39a] mb-4 font-pinar">۴۰۴</h1>
        <p className="text-xl text-gray-500 mb-8">صفحه مورد نظر پیدا نشد!</p>
        <Link href="/" className="inline-block bg-[#64a39a] text-white px-8 py-3 rounded-lg hover:bg-[#4a7d73] transition-colors">
          بازگشت به خانه
        </Link>
      </div>
    </div>
  );
}