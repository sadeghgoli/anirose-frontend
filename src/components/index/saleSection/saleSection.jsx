import { getSaleProducts } from "../../../utils/api/serverData.js";
import SaleSectionClient from "./SaleSectionClient.jsx";

const SaleSection = async () => {
  const products = await getSaleProducts();
  if (!products.length) return null;
  return <SaleSectionClient products={products} />;
};

export default SaleSection;
