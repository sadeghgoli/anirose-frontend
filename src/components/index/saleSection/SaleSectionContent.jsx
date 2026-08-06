'use client'
import React, { useState, useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { addToCart } from "../../../utils/api/cartServiceButton/cartServiceButton.js";

const ButtonSpinner = () => (
  <span
    className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full flex-shrink-0"
    style={{
      animation: "spin 0.8s linear infinite",
      marginLeft: "10px",
    }}
  />
);

const RotatingImage = () => (
  <section className="relative flex justify-center w-full max-w-[1400px] mx-auto px-4 z-10">
    <div className="mx-auto -translate-y-1/2">
      <Image
        src="/images/test/Objects-4.png"
        alt="تصویر تزئینی چرخان"
        width={200}
        height={200}
        className="object-contain animate-[rotation_6s_linear_infinite] mx-auto"
       loading="lazy" />
    </div>
  </section>
);

const calculateDiscount = (price, salePrice) => {
  const p = parseInt(String(price).replace(/,/g, ""), 10);
  const sp = parseInt(String(salePrice).replace(/,/g, ""), 10);
  if (!p || !sp || p <= sp) return null;
  return Math.round(((p - sp) / p) * 100);
};

const ProductCard = ({ product, onAddToCart, isLoading }) => {
  const discount =
    product.sale && product.salePrice
      ? calculateDiscount(product.price, product.salePrice)
      : null;

  const productSlug = product.name.replace(/\s+/g, "-");
  const productUrl = `/product/${product.id}/${productSlug}`;

  return (
    <Link href={productUrl} className="block group h-full">
      <div className="bg-white rounded-xl overflow-hidden h-full flex flex-col">
        <div className="relative overflow-hidden p-3 sm:p-4 sm:pb-0 pb-0">
          <Image
            src={product.image || "/images/test/placeholder.jpg"}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full aspect-square object-contain"
           loading="lazy" />
          {discount && (
            <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#D19D15] text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
              {discount}% تخفیف
            </span>
          )}
        </div>

        <div className="p-3 py-0 sm:p-4 sm:py-0 text-center flex flex-col flex-grow gap-1 min-h-[100px] sm:min-h-[120px] md:min-h-[140px]">
          <h4 className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-gray-500 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem]">
            {product.name}
          </h4>

          <div className="mt-2">
            <div className="flex justify-center items-center gap-1 flex-nowrap">
              {product.salePrice ? (
                <>
                  <del className="text-gray-400 text-[10px] sm:text-[11px] md:text-[12px] whitespace-nowrap">
                    {product.price} تومان
                  </del>
                  <span className="text-[#0C5505] font-bold text-[10px] sm:text-[11px] md:text-[12px] whitespace-nowrap">
                    {product.salePrice}
                  </span>
                  <span className="text-[#0C5505] text-[10px] sm:text-[11px] md:text-[12px] whitespace-nowrap">
                    تومان
                  </span>
                </>
              ) : (
                <>
                  <span className="text-gray-400 font-bold text-[10px] sm:text-[11px] md:text-[12px] whitespace-nowrap">
                    {product.price}
                  </span>
                  <span className="text-gray-400 text-[10px] sm:text-[11px] md:text-[12px] whitespace-nowrap">
                    تومان
                  </span>
                </>
              )}
            </div>

            <div className="flex justify-center items-center">
              <button
                onClick={(e) => onAddToCart(e, product.id)}
                disabled={isLoading}
                className={`
                                    mt-2 text-white text-[10px] sm:text-xs md:text-sm px-1 sm:px-1 md:px-2 py-1 sm:py-2 rounded-md 
                                    transition-all duration-300 flex items-center justify-center gap-1 sm:gap-2
                                    ${
                                      isLoading
                                        ? "bg-gradient-to-r from-[#0C5505] to-[#42897B] opacity-60"
                                        : "bg-gradient-to-r from-[#0C5505] to-[#42897B] hover:opacity-90"
                                    }
                                `}
              >
                {isLoading ? (
                  <>
                    <span>در حال افزودن...</span>
                    <ButtonSpinner />
                  </>
                ) : (
                  <span>افزودن به سبد خرید</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const SaleSectionContent = ({ products }) => {
  const [loadingProductId, setLoadingProductId] = useState(null);
  const swiperRef = useRef(null);

  const handleAddToCart = async (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    if (loadingProductId) return;

    setLoadingProductId(productId);

    try {
      await addToCart(productId);
    } catch (error) {
      console.error("❌ خطا در افزودن به سبد خرید:", error);
    } finally {
      setLoadingProductId(null);
    }
  };

  return (
    <>
      <style>{`
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes rotation {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    /* استایل‌های Swiper */
    .sale-swiper .swiper {
        overflow: visible !important;
        padding: 10px 0;
    }
    .sale-swiper .swiper-slide {
        height: auto;
    }
    .sale-swiper .swiper-button-prev,
    .sale-swiper .swiper-button-next {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        opacity: 1;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .sale-swiper .swiper-button-prev:hover,
    .sale-swiper .swiper-button-next:hover {
        transform: scale(1.05);
    }
    /* حذف آیکون پیش‌فرض Swiper */
    .sale-swiper .swiper-button-prev::after,
    .sale-swiper .swiper-button-next::after {
        display: none !important;
        content: none !important;
        font-size: 0 !important;
        visibility: hidden !important;
    }
    .sale-swiper .swiper-button-prev svg,
.sale-swiper .swiper-button-next svg {
  display: none !important;
}
    .sale-swiper .swiper-button-disabled {
        opacity: 0.3 !important;
        cursor: not-allowed;
    }
    
    /* مخفی کردن دکمه‌ها در موبایل */
    @media (max-width: 767px) {
        .sale-swiper .swiper-button-prev,
        .sale-swiper .swiper-button-next {
            display: none !important;
        }
    }
    
    @media (max-width: 640px) {
        .sale-swiper .swiper-button-prev,
        .sale-swiper .swiper-button-next {
            width: 32px;
            height: 32px;
        }
    }
`}</style>

      <section className="relative w-full max-w-[1400px] z-20 mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-10">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-4 sm:p-6 md:p-8 pb-1 sm:pb-1 md:pb-3">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-center lg:text-right order-1">
              <h3 className="text-xs sm:text-sm font-normal text-gray-500 mb-0.5 sm:mb-1">
                Anirose discounts
              </h3>
              <h2 className="text-lg whitespace-nowrap sm:text-xl md:text-2xl font-bold text-[#0C5505]">
                حراجی های آنی رز
              </h2>
            </div>

            <div className="hidden p-10 lg:block order-2">
              <Image
                src="/images/test/Frame-31-min.png"
                alt="تصویر تزئینی حراجی"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full"
               loading="lazy" />
            </div>
          </div>

          <div className="relative mt-6 sm:mt-10 sale-swiper">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Autoplay]}
              spaceBetween={12}
              slidesPerView={2}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: ".sale-swiper .swiper-button-prev",
                nextEl: ".sale-swiper .swiper-button-next",
                createElements: false,
              }}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 12,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 14,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 16,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 16,
                },
              }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard
                    product={product}
                    onAddToCart={handleAddToCart}
                    isLoading={loadingProductId === product.id}
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="swiper-button-prev absolute !right-0 sm:left-1 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
              <Image
                src="/images/test/Asset-1-3-2.png"
                alt="قبلی"
                width={28}
                height={64}
                className="rotate-180"
               loading="lazy" />
              <span className="absolute bg-transparent piner inset-0 flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">
                ‹
              </span>
            </div>

            <div className="swiper-button-next absolute !left-0 sm:right-1 top-1/2 -translate-y-1/2 z-10 cursor-pointer">
              <Image
                src="/images/test/Asset-1-3-2.png"
                alt="بعدی"
                width={28}
                height={64}
               loading="lazy" />
              <span className="absolute piner bg-transparent inset-0 flex items-center justify-center text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold drop-shadow-md">
                ›
              </span>
            </div>
          </div>
        </div>
      </section>

      <RotatingImage />
    </>
  );
};

export default SaleSectionContent;
