import Doctors from '../../src/views/Doctors/Doctors.jsx'
import JsonLd from '../../src/components/JsonLd'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "متخصصان | آنی رز",
  description: "مشاوره تخصصی با بهترین متخصصان تغذیه و سلامت - رزرو نوبت آنلاین از متخصصان آنی رز",
  alternates: {
    canonical: "https://aniroseco.ir/doctors",
  },
  openGraph: {
    title: "متخصصان | آنی رز",
    description: "مشاوره تخصصی با بهترین متخصصان تغذیه و سلامت",
    images: [defaultOgImage],
  },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "متخصصان آنی رز",
  description: "لیست متخصصان و مشاوران تغذیه و سلامت",
  url: "https://aniroseco.ir/doctors",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroseco.ir" },
    { "@type": "ListItem", position: 2, name: "متخصصان", item: "https://aniroseco.ir/doctors" },
  ],
};

export default function DoctorsPage() {
  return (
    <>
      <JsonLd data={collectionJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Doctors />
    </>
  );
}
