import "./globals.css";
import ClientLayout from "./ClientLayout";
import { peyda, pinar } from "./fonts";
import JsonLd from "../src/components/JsonLd";
import PageChrome from "../src/components/common/PageChrome/PageChrome.jsx";

export const metadata = {
  metadataBase: new URL('https://aniroseco.ir'),
  title: {
    default: "آنی رز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک",
    template: "%s",
  },
  description: "فروشگاه اینترنتی آنی رز - مرجع تخصصی خرید محصولات طبیعی، ارگانیک و سلامت محور با بهترین قیمت و کیفیت در ایران",
  authors: [{ name: "آنی رز" }],
  creator: "آنی رز",
  publisher: "آنی رز",
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "آنی رز",
    title: "آنی رز | AniRoz - فروشگاه محصولات طبیعی و ارگانیک",
    description: "فروشگاه اینترنتی آنی رز - خرید انواع محصولات طبیعی و ارگانیک با بهترین قیمت",
    url: "https://aniroseco.ir",
    images: [{ url: "/images/test/Asset-1-3-1.png", width: 200, height: 200, alt: "آنی رز" }],
    countryName: "Iran",
  },
  twitter: {
    card: "summary_large_image",
    title: "آنی رز | AniRoz",
    description: "فروشگاه اینترنتی آنی رز - خرید انواع محصولات طبیعی و ارگانیک",
    images: [{ url: "/images/test/Asset-1-3-1.png", alt: "آنی رز" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: {
    canonical: "https://aniroseco.ir",
    languages: { "fa-IR": "https://aniroseco.ir" },
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
  "@id": "https://aniroseco.ir/#store",
  name: "آنی رز",
  alternateName: "AniRoz",
  url: "https://aniroseco.ir",
  logo: "https://aniroseco.ir/images/test/Asset-1-3-1.png",
  image: "https://aniroseco.ir/images/test/Asset-1-3-1.png",
  description: "فروشگاه اینترنتی آنی رز - خرید انواع محصولات طبیعی و ارگانیک",
  brand: { "@type": "Brand", name: "آنی رز" },
  address: { "@type": "PostalAddress", streetAddress: "تهران", addressLocality: "تهران", addressCountry: "IR" },
  contactPoint: { "@type": "ContactPoint", telephone: "+98-9123456789", contactType: "customer service", availableLanguage: "fa" },
  sameAs: ["https://instagram.com/aniroz"],
  openingHours: "Sa-Th 09:00-20:00",
  priceRange: "$$$",
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://aniroseco.ir/#website",
  name: "آنی رز",
  alternateName: "AniRoz",
  url: "https://aniroseco.ir",
  inLanguage: "fa-IR",
  publisher: { "@id": "https://aniroseco.ir/#store" },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://aniroseco.ir/shop?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroseco.ir" },
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
          <PageChrome>{children}</PageChrome>
        </ClientLayout>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
        <JsonLd data={breadcrumbJsonLd} />
      </body>
    </html>
  );
}
