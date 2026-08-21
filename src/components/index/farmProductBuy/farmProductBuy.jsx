import Link from "next/link";
import Image from "next/image";

const FarmProductBuy = () => {
  return (
    <div className="w-full py-10 md:pt-20">
      <div className="w-full relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="relative rounded-2xl bg-gradient-to-r from-[#0C5505] via-[#1a6b0e] to-[#0C5505] min-h-[120px]">
          <div className="absolute inset-0 opacity-10 rounded-2xl overflow-hidden"
               style={{ backgroundImage: "url('/images/test/Frame-41-2.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div className="absolute top-0 left-0 w-[120px] h-full opacity-15 rounded-2xl overflow-hidden"
               style={{ backgroundImage: "url('/images/test/Frame-74.png')", backgroundRepeat: "no-repeat", backgroundPosition: "center left", backgroundSize: "contain" }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center">
            {/* Farmer Image - Right Side - overflows above */}
            <div className="w-full md:w-[140px] lg:w-[160px] flex-shrink-0 flex justify-center md:justify-end order-1 md:order-1">
              <Image
                src="/images/banners/human33.png"
                alt="کشاورز"
                width={130}
                height={160}
                sizes="(max-width: 768px) 100px, 130px"
                className="w-[100px] md:w-[130px] h-auto object-contain -mt-[80px] md:-mt-[100px] mb-[-2px] relative z-20"
                loading="lazy"
                quality={75}
              />
            </div>

            {/* Text + Button */}
            <div className="flex-1 flex flex-col md:flex-row items-center gap-4 p-6 md:p-8 order-2 md:order-2">
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2">
                  خرید محصولات کشاورزان با بهترین قیمت
                </h3>
                <p className="text-gray-200/80 text-sm md:text-base">
                  اگر کشاورز هستید و محصولات گیاهی و دارویی با کیفیت تولید می‌کنید،
                  ما آماده خرید محصولات شما با بالاترین قیمت بازار هستیم.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white text-[#0C5505] px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-sm md:text-base whitespace-nowrap"
                >
                  تماس با ما
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmProductBuy;