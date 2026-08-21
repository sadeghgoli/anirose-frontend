'use client'
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { fetchTestimonialsData } from "../../../utils/api/testimonialsService/testimonialsService.js";
import TestimonialsSkeleton from "../../skeleton/Testimonials/TestimonialsSkeleton.jsx";

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${
            i < fullStars
              ? "text-yellow-400 fill-yellow-400"
              : hasHalfStar && i === fullStars
              ? "text-yellow-400 fill-yellow-400 opacity-50"
              : "text-gray-300 fill-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  );
};

const Testimonials = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchTestimonialsData();
        setData(result);
      } catch {
        setData({ testimonials: [], titleIcon: "", titleEn: "", titleFa: "", testimonialTitle: "", testimonialDescription: "" });
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <TestimonialsSkeleton />;
  if (!data) return null;

  const {
    titleIcon,
    titleEn,
    titleFa,
    testimonialTitle,
    testimonialDescription,
    testimonials = [],
  } = data;

  return (
    <>
      {/* ???? ???: ????? ? ?????? */}
      <section className="relative w-full py-10 pb-19 overflow-hidden">
        <div className="relative z-10 w-full max-w-14xl mx-auto px-14 lg:px-18">
          <div className="text-center mb-4">
            <Image src={titleIcon} alt="" width={48} height={0} sizes="100vw" className="w-10 md:w-12 mx-auto"  loading="lazy" />
          </div>
          <h3 className="text-base md:text-sm font-normal text-gray-500 text-center mb-1">
            {titleEn}
          </h3>
          <h2 className="text-lg md:text-xl lg:text-3xl font-bold text-[#0C5505] text-center mb-8">
            {titleFa}
          </h2>
        </div>
      </section>

      {/* ???? ???: ?????? ??????? ?? ???????? ??? - ??? ??? ??????? ???? */}
      <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-10">
        <div
          className="rounded-xl bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/test/Frame-347-scaled.jpg')",
          }}
        >
          <div className="absolute inset-0 z-0" />

          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8 ">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* ???? ??? - ??? ?? */}
              <div className="w-full p-6 rounded-2xl shadow-lg">
                <h2 className="text-2xl md:text-3xl text-center md:text-right font-bold text-[#0C5505] mb-4">
                  {testimonialTitle}
                </h2>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  {testimonialDescription}
                </p>
              </div>

              {/* ???? ??????? - ??? ???? */}
              <div className="w-full lg:w-7/12 relative lg:-mt-20 shadow-lg">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".testimonial-swiper-next",
                    prevEl: ".testimonial-swiper-prev",
                  }}
                  autoplay={{ delay: 4000, disableOnInteraction: false }}
                  loop={true}
                  className="testimonial-slider h-auto"
                >
                  {testimonials.map((item) => (
                    <SwiperSlide key={item.id} className="h-auto mb-5">
                      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl h-auto">
                        <div className="flex flex-wrap items-center gap-4 mb-4 bg-gray-100 rounded-xl p-2">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={56}
                            height={56}
                            className="rounded-full object-cover border-2 border-gray-200"
                           loading="lazy" />
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-gray-800">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500">{item.role}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <StarRating rating={item.rating} />
                          </div>
                        </div>
                        {/* ????? ???? ?????? ??? ??? ? ????? ???? ?????? ?? ???? ???? */}
                        <div className="max-h-[300px] md:max-h-[400px] overflow-y-auto pr-2">
                          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                            {item.comment}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* ???????? ?????? */}
                <button type="button" aria-label="اسلاید قبلی" className="testimonial-swiper-prev piner absolute p-4 md:p-2 -left-4 top-1/2 -translate-y-1/2 z-20 w-5 h-5 md:w-7 md:h-7 rounded-full bg-white text-[#0C5505] shadow-md hover:bg-[#0C5505] hover:text-white text-[30px] font-bold flex items-center justify-center transition-all">
                  ›
                </button>
                <button type="button" aria-label="اسلاید بعدی" className="testimonial-swiper-next piner absolute p-4 md:p-2 -right-4 top-1/2 -translate-y-1/2 z-20 w-5 h-5 md:w-7 md:h-7 rounded-full bg-white text-[#0C5505] shadow-md hover:bg-[#0C5505] hover:text-white text-[30px] font-bold flex items-center justify-center transition-all">
                  ‹
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
                .testimonial-slider .swiper {
                    overflow: visible !important;
                    padding: 10px 0;
                }

            `}</style>
    </>
  );
};

export default Testimonials;