import Link from "next/link";

const BANNERS = [
  {
    id: 1,
    badgeText: "ویژه",
    title: "تخفیف ویژه",
    link: "/shop",
  },
  {
    id: 2,
    badgeText: "جدید",
    title: "محصولات جدید",
    link: "/shop",
  },
];

const DoubleBanners = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 lg:px-8 max-lg:px-4 max-sm:px-2 py-10">
      <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-6">
        {BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="relative w-full rounded-[20px] py-6 overflow-hidden flex items-center px-4 max-lg:px-3 max-sm:px-2 max-sm:min-h-[200px]"
            style={{ backgroundColor: "#2f2f2f" }}
          >
            <div className="relative z-10 w-full flex flex-col gap-3 max-sm:gap-2">
              <div>
                <span
                  className="inline-block text-white text-xl font-semibold px-5 py-1 rounded-t-[22px] rounded-bl-[22px] max-sm:text-base"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #85d3cb 0%, #55bbb0 100%)",
                    boxShadow: "0px 6px 40px 0px rgba(133, 211, 203, 0.5)",
                  }}
                >
                  {banner.badgeText}
                </span>
              </div>
              <h3
                className="text-white leading-tight max-sm:text-lg font-bold"
                style={{
                  fontSize: "34px",
                  textShadow: "0px 4px 20px rgba(255, 255, 255, 0.4)",
                }}
              >
                {banner.title}
              </h3>
              <Link
                href={banner.link}
                className="inline-block text-[#cacaca] font-medium px-5 py-2 border border-white rounded-[14px]
                           hover:bg-white hover:text-[#0c5505] transition-all duration-300
                           max-sm:px-6 max-sm:py-2 w-fit"
                style={{ fontSize: "16px", fontWeight: 500 }}
              >
                مشاهده
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DoubleBanners;
