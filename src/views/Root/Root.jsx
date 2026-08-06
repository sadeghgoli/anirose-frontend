import HeroSlider from "../../components/index/heroSlider";
import DoubleBanner from "../../components/index/doubleBanner";
import WhyChooseUs from "../../components/index/whyChooseUs";
import SaleSection from "../../components/index/saleSection";
import GiftRequestComponent from "../../components/index/giftRequest";
import AboutSection from "../../components/index/aboutSection";
import AniroseStats from "../../components/index/aniroseStats";

import {
  LazyCategories,
  LazyCategoryProductSlider,
  LazyTestimonials,
  LazyBlogPostsSlider,
} from "./HomeLazySections";

const Root = () => {
  return (
    <>
      <HeroSlider />
      <LazyCategories />
      <DoubleBanner />
      <WhyChooseUs />
      <SaleSection />
      <GiftRequestComponent />
      <LazyCategoryProductSlider />
      <AboutSection />
      <LazyCategoryProductSlider contrary={true} />
      <AniroseStats />
      <LazyTestimonials />
      <LazyBlogPostsSlider />
    </>
  );
};

export default Root;
