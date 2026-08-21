const MOCK_BANNERS = {
  banners: [
    { id: 1, image: "/images/test/banner-1.jpg", title: "تخفیف ویژه", badge: "ویژه", link: "/shop" },
    { id: 2, image: "/images/test/banner-2.jpg", title: "محصولات جدید", badge: "جدید", link: "/shop" },
  ],
};

export const fetchBannersData = async () => {
  return MOCK_BANNERS;
};
