export default function manifest() {
  return {
    name: "آنی روز | فروشگاه محصولات طبیعی و ارگانیک",
    short_name: "آنی روز",
    description: "فروشگاه اینترنتی آنی روز - خرید محصولات طبیعی، ارگانیک و سلامت‌محور با بهترین قیمت و کیفیت در ایران",
    id: "https://aniroz.ir/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0c5505",
    theme_color: "#0c5505",
    lang: "fa",
    dir: "rtl",
    categories: ["shopping", "health", "lifestyle"],
    icons: [
      { src: "/cropped-Group-48-3-32x32.png", sizes: "32x32", type: "image/png", purpose: "any" },
      { src: "/images/test/cropped-Group-48-3-180x180.png", sizes: "180x180", type: "image/png", purpose: "any" },
      { src: "/images/test/cropped-Group-48-3-192x192.png", sizes: "192x192", type: "image/png", purpose: "any maskable" },
    ],
  };
}
