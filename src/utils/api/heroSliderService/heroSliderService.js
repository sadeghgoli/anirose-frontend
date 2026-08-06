export const fetchHeroSliderData = async () => {
  return {
    slides: [
      {
        id: 1,
        image: "/images/test/slide-1.jpg",
        title: "÷",
        subtitle: "درحال توسعه ",
        badgeText: "🚧",
        bgImage: "",
        leafImage: "/images/test/Asset-1-3-1.png",
        buttonText: "🚧",
        buttonLink: "/shop",
      },
      {
        id: 2,
        image: "/images/test/slide-2.jpg",
        subtitle: "درحال توسعه ",
        badgeText: "🚧",
        bgImage: "",
        leafImage: "/images/test/Asset-1-3-1.png",
        buttonText: "🚧",
        buttonLink: "/shop",
      },
    ],
    settings: { autoplaySpeed: 3000 },
  };
};
