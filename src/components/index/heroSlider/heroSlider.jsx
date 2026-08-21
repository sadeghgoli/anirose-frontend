"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DESKTOP_SLIDES = [
  { src: "/images/banners/slider-1.jpg", alt: "بنر تخفیف ویژه آنی رز" },
  { src: "/images/banners/slider-2.jpg", alt: "بنر محصولات ارگانیک آنی رز" },
  { src: "/images/banners/slider-4.jpg", alt: "بنر فروشگاه اینترنتی آنی رز" },
];

const HeroSlider = () => {
    return (
        <div className="relative w-full py-0 overflow-x-clip mt-4">
            {/* بک‌گراند راست (Frame-41-2.png) */}
            <div className="absolute top-0 right-0 w-[90px] h-full z-0 pointer-events-none">
                <Image
                    src="/images/test/Frame-41-2.png"
                    alt=""
                    fill
                    className="object-contain object-right"
                    priority={false}
                />
            </div>

            {/* بک‌گراند چپ (Frame-74.png) */}
            <div className="absolute top-0 left-0 w-[90px] h-full z-0 pointer-events-none">
                <Image
                    src="/images/test/Frame-74.png"
                    alt=""
                    fill
                    className="object-contain object-left"
                    priority={false}
                />
            </div>

            <div className="relative z-10 w-full max-w-14xl mx-auto px-2 lg:px-18 overflow-visible">
                <div className="relative max-w-[1250px] mx-auto overflow-visible">
                    {/* اسلایدر دسکتاپ و تبلت */}
                    <div className="hidden md:block relative">
                        <div className="rounded-[20px] overflow-hidden">
                            <Swiper
                                className="hero-slider w-full"
                                modules={[Autoplay, Navigation, Pagination]}
                                spaceBetween={0}
                                slidesPerView={1}
                                loop
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: false,
                                    pauseOnMouseEnter: true,
                                }}
                                navigation={{
                                    nextEl: ".hero-next",
                                    prevEl: ".hero-prev",
                                }}
                                pagination={{ clickable: true }}
                            >
                                {DESKTOP_SLIDES.map((slide, i) => (
                                    <SwiperSlide key={slide.src}>
                                        <div className="relative h-[300px] lg:h-[380px]">
                                            <Image
                                                src={slide.src}
                                                alt={slide.alt}
                                                fill
                                                priority={i === 0}
                                                loading={i === 0 ? "eager" : "lazy"}
                                                className="object-cover w-full"
                                                sizes="(max-width: 1024px) 100vw, 1250px"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* دکمه قبلی */}
                        <button
                            className="hero-prev absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
                            aria-label="اسلاید قبلی"
                        >
                            <svg className="w-5 h-5 text-[#0c5505]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* دکمه بعدی */}
                        <button
                            className="hero-next absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
                            aria-label="اسلاید بعدی"
                        >
                            <svg className="w-5 h-5 text-[#0c5505]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* تصویر موبایل */}
                    <div className="block md:hidden rounded-[20px] overflow-hidden">
                        <Image
                            src="/images/banners/mobile-slider-1.png"
                            alt="بنر آنی رز"
                            width={376}
                            height={180}
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
            </div>

            <style>{`
                .hero-slider .swiper-pagination {
                    bottom: 14px !important;
                }
                .hero-slider .swiper-pagination-bullet {
                    width: 8px;
                    height: 8px;
                    background: #ffffff;
                    opacity: 0.55;
                    border-radius: 9999px;
                    transition: all 0.3s ease;
                }
                .hero-slider .swiper-pagination-bullet-active {
                    width: 24px;
                    background: #64a39a;
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default HeroSlider;
