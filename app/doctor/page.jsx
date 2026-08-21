import ConsultantProfile from '../../src/views/ConsultantProfile/ConsultantProfile.jsx'
import JsonLd from '../../src/components/JsonLd'
import { defaultOgImage } from '../../src/utils/seo'

export const metadata = {
  title: "مشاوره تخصصی | آنی رز",
  description: "دریافت مشاوره تخصصی آنلاین از متخصصان تغذیه و سلامت آنی رز - رزرو نوبت و مشاوره",
  alternates: {
    canonical: "https://aniroseco.ir/doctor",
  },
  openGraph: {
    title: "مشاوره تخصصی | آنی رز",
    description: "دریافت مشاوره تخصصی آنلاین از متخصصان تغذیه و سلامت",
    images: [defaultOgImage],
  },
};

const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "مشاوره تخصصی آنی رز",
  description: "دریافت مشاوره تخصصی آنلاین از متخصصان تغذیه و سلامت",
  url: "https://aniroseco.ir/doctor",
  areaServed: "IR",
  availableLanguage: "fa",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "خانه", item: "https://aniroseco.ir" },
    { "@type": "ListItem", position: 2, name: "مشاوره تخصصی", item: "https://aniroseco.ir/doctor" },
  ],
};

export default function DoctorPage() {
  return (
    <>
      <JsonLd data={professionalServiceJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ConsultantProfile />
    </>
  );
}
