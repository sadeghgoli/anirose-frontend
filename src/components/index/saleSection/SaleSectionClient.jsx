'use client'
import dynamic from "next/dynamic";
import SaleSectionSkeleton from "../../skeleton/SaleSection/SaleSectionSkeleton.jsx";

const SaleSectionContent = dynamic(() => import("./SaleSectionContent.jsx"), {
  ssr: false,
  loading: () => <SaleSectionSkeleton />,
});

const SaleSectionClient = ({ products }) => <SaleSectionContent products={products} />;

export default SaleSectionClient;
