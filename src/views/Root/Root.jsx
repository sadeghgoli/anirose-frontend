import HeroSlider from "../../components/index/heroSlider";
import WhyChooseUs from "../../components/index/whyChooseUs";
import SaleSection from "../../components/index/saleSection";
import GiftRequestComponent from "../../components/index/giftRequest";
import AniroseStats from "../../components/index/aniroseStats";
import TraditionalConsultation from "../../components/index/traditionalConsultation";
import FarmProductBuy from "../../components/index/farmProductBuy";

import {
  LazyCategories,
  LazyTestimonials,
  LazyBlogPostsSlider,
} from "./HomeLazySections";

const Root = () => {
  return (
    <>
      <h1 className="sr-only">فروشگاه اینترنتی آنی رز | محصولات طبیعی و ارگانیک</h1>
      <HeroSlider />
      <LazyCategories />
      <SaleSection />
      <TraditionalConsultation />
      <FarmProductBuy />


      <AniroseStats />
      <GiftRequestComponent />

      <LazyTestimonials />
      <WhyChooseUs />

      <LazyBlogPostsSlider />
    </>
  );
};

export default Root;
