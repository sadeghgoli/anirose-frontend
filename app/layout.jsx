import { Suspense } from "react";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { peyda, pinar } from "./fonts";
import JsonLd from "../src/components/JsonLd";
import Header from "../src/components/common/Header";
import Footer from "../src/components/common/Footer";

export const metadata = {
  metadataBase: new URL('https://aniroz.ir'),
  title: {
    default: "آنی روز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک",
    template: "%s",
  },
  description: "فروشگاه اینترنتی آنی روز - مرجع تخصصی خرید محصولات طبیعی، ارگانیک و سلامت محور با بهترین قیمت و کیفیت در ایران",
  authors: [{ name: "آنی روز" }],
  creator: "آنی روز",
  publisher: "آنی روز",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "آنی روز",
    title: "آنی روز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک",
    description: "فروشگاه اینترنتی آنی روز - خرید انواع محصولات طبیعی و ارگانیک با بهترین قیمت",
    url: "https://aniroz.ir",
    images: [{ url: "/images/test/Asset-1-3-1.png", width: 200, height: 200, alt: "آنی روز" }],
    countryName: "Iran",
  },
  twitter: {
    card: "summary_large_image",
    title: "آنی روز | AniRoz",
    description: "فروشگاه اینترنتی آنی روز - خرید انواع محصولات طبیعی و ارگانیک",
    images: [{ url: "/images/test/Asset-1-3-1.png", alt: "آنی روز" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "https://aniroz.ir",
    languages: { "fa-IR": "https://aniroz.ir" },
  },
  category: "business",
  icons: {
    icon: "/cropped-Group-48-3-32x32.png",
    shortcut: "/cropped-Group-48-3-32x32.png",
    apple: "/cropped-Group-48-3-32x32.png",
    other: [
      {
        rel: "icon",
        url: "/images/test/cropped-Group-48-3-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "apple-touch-icon",
        url: "/images/test/cropped-Group-48-3-180x180.png",
        sizes: "180x180",
      },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c5505",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  "@id": "https://aniroz.ir/#store",
  name: "آنی روز",
  alternateName: "AniRoz",
  url: "https://aniroz.ir",
  logo: "https://aniroz.ir/images/test/Asset-1-3-1.png",
  image: "https://aniroz.ir/images/test/Asset-1-3-1.png",
  description: "فروشگاه اینترنتی آنی روز - خرید انواع محصولات طبیعی و ارگانیک",
  brand: { "@type": "Brand", name: "آنی روز" },
  address: { "@type": "PostalAddress", streetAddress: "تهران", addressLocality: "تهران", addressCountry: "IR" },
  contactPoint: { "@type": "ContactPoint", telephone: "+98-9123456789", contactType: "customer service", availableLanguage: "fa" },
  sameAs: ["https://instagram.com/aniroz"],
  openingHours: "Sa-Th 09:00-20:00",
  priceRange: "$$$",
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://aniroz.ir/#website",
  name: "آنی روز",
  alternateName: "AniRoz",
  url: "https://aniroz.ir",
  inLanguage: "fa-IR",
  publisher: { "@id": "https://aniroz.ir/#store" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://aniroz.ir/shop?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroz.ir" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={`${peyda.variable} ${pinar.variable}`}>
      <head>
        <link rel="preconnect" href="https://aniroseco.ir" />
        <link rel="dns-prefetch" href="https://aniroseco.ir" />
        <meta name="geo.region" content="IR" />
        <meta name="geo.placename" content="Tehran" />
      </head>
      <body suppressHydrationWarning className={peyda.className}>
        <ClientLayout>
          <Suspense fallback={null}>
            <Header />
          </Suspense>
          <main>{children}</main>
          <Footer />
        </ClientLayout>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
      </body>
    </html>
  );
}
