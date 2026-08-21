'use client';

import { useState, useEffect, useRef, useCallback, useTransition, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// Services
import { fetchCategoriesData } from '@/src/utils/api/categoriesService/categoriesService';
import { fetchCategoryProducts } from '@/src/utils/api/categoryProductsService/categoryProductsService';
import { addToCart } from '@/src/utils/api/cartServiceButton/cartServiceButton';

// Components
import CategoryProductSliderSkeleton from '@/src/components/skeleton/CategoryProductSlider/CategoryProductSliderSkeleton';
// Constants
const IMAGES = {
  backgroundRight: '/images/test/Frame-41-2.png',
  backgroundLeft: '/images/test/Frame-74.png',
  banner: '/images/test/Frame-59.png',
  navigation: '/images/test/Asset-1-3-2.png',
};

const BREAKPOINTS = {
  320: { slidesPerView: 2, spaceBetween: 8 },
  480: { slidesPerView: 2, spaceBetween: 10 },
  640: { slidesPerView: 2, spaceBetween: 12 },
  768: { slidesPerView: 3, spaceBetween: 12 },
  1024: { slidesPerView: 4, spaceBetween: 13 },
  1280: { slidesPerView: 4, spaceBetween: 16 },
};

// Utility Functions
const calculateDiscount = (price, salePrice) => {
  const p = Number(String(price).replace(/,/g, ''));
  const sp = Number(String(salePrice).replace(/,/g, ''));
  if (!p || !sp || p <= sp) return null;
  return Math.round(((p - sp) / p) * 100);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('fa-IR').format(price);
};

// Components
const ButtonSpinner = memo(() => (
  <span 
    className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin ml-1"
    aria-hidden="true"
  />
));
ButtonSpinner.displayName = 'ButtonSpinner';

const ProductCard = memo(({ product, onAddToCart, isLoading }) => {
  const discount = product.sale && product.salePrice 
    ? calculateDiscount(product.price, product.salePrice) 
    : null;

  const productSlug = product.name.replace(/\s+/g, '-');

  const handleAddToCart = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLoading) return;
    await onAddToCart(product.id);
  }, [onAddToCart, product.id, isLoading]);

  return (
    <Link
      href={`/product/${product.id}/${productSlug}`}
      className="block group h-full focus:outline-none focus:ring-2 focus:ring-[#0C5505] focus:ring-offset-2 rounded-xl"
    >
      <article className="bg-white rounded-xl overflow-hidden h-full flex flex-col transition-all duration-300 shadow-lg hover:shadow-xl">
        <div className="relative overflow-hidden p-2 pb-0">
          <Image
            src={product.image || "/images/test/placeholder.jpg"}
            alt={product.name}
            width={300}
            height={300}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="w-full aspect-square object-contain group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            quality={75}
          />
          {discount && (
            <span className="absolute top-3 right-1 bg-[#D19D15] text-white text-[10px] px-2.5 py-1.5 rounded-l-lg">
              تخفیف!
            </span>
          )}
        </div>
        <div className="p-2 text-center flex flex-col flex-grow">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-500 line-clamp-2 min-h-[2rem]">
            {product.name}
          </h4>
          <div className="mt-1 flex-grow flex flex-col justify-end">
            <div className="flex justify-center items-center gap-0.5 flex-wrap">
              {product.salePrice ? (
                <>
                  <del className="text-gray-400 text-[9px] sm:text-[10px]">
                    {formatPrice(product.price)}
                  </del>
                  <span className="text-[#0C5505] font-bold text-[10px] sm:text-[11px]">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-[#0C5505] text-[9px] sm:text-[10px]">
                    تومان
                  </span>
                </>
              ) : (
                <>
                  <span className="text-gray-400 font-bold text-[10px] sm:text-[11px]">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-gray-400 text-[9px] sm:text-[10px]">
                    تومان
                  </span>
                </>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className={`
                mt-1.5 text-white text-[9px] sm:text-[10px] px-2 py-1 rounded-md 
                transition-all duration-300 flex items-center justify-center gap-1 mx-auto w-full max-w-[120px]
                ${
                  isLoading
                    ? "bg-gradient-to-r from-[#0C5505] to-[#42897B] opacity-60 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#0C5505] to-[#42897B] hover:opacity-90 active:scale-95"
                }
              `}
              aria-label={`افزودن ${product.name} به سبد خرید`}
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
      </article>
    </Link>
  );
});
ProductCard.displayName = 'ProductCard';

// Single category slider
const CategorySlider = memo(({ category, index }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef(null);
  const swiperRef = useRef(null);

  const prevClass = `cat-prev-${category.id}`;
  const nextClass = `cat-next-${category.id}`;
  const sliderClass = `cat-slider-${category.id}`;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchCategoryProducts(category.id);
        if (productsData?.products) {
          setProducts(productsData.products);
        }
      } catch (error) {
        console.warn('خطا در دریافت محصولات دسته‌بندی:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [category.id]);

  const handleAddToCart = useCallback(async (productId) => {
    if (loadingProductId) return;

    startTransition(() => {
      setLoadingProductId(productId);
    });

    try {
      await addToCart(productId);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      startTransition(() => {
        setLoadingProductId(null);
      });
    }
  }, [loadingProductId]);

  const backgroundStyles = {
    right: {
      backgroundImage: `url(${IMAGES.backgroundRight})`,
      backgroundPosition: 'center right',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
    left: {
      backgroundImage: `url(${IMAGES.backgroundLeft})`,
      backgroundPosition: 'center left',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
  };

  if (loading) return <CategoryProductSliderSkeleton />;
  if (!products.length) return null;

  return (
    <section
      className="relative py-6 sm:py-10 overflow-x-clip max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12"
      aria-label={`محصولات دسته‌بندی ${category.name}`}
    >
      <div
        className="absolute top-0 right-0 w-[90px] h-full z-0 pointer-events-none hidden sm:block"
        style={backgroundStyles.right}
        aria-hidden="true"
      />
      <div
        className="absolute top-0 left-0 w-[90px] h-full z-0 pointer-events-none hidden sm:block"
        style={backgroundStyles.left}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
          <div className="w-full lg:w-[22%]">
            <div className="relative w-full mx-auto lg:mx-0 h-auto lg:h-full">
              <Link
                href={`/shop?category=${category.id}`}
                className="relative group block w-full focus:outline-none focus:ring-2 focus:ring-[#0C5505] focus:ring-offset-2 rounded-xl"
              >
                <Image
                  src={IMAGES.banner}
                  alt={category.name}
                  width={400}
                  height={500}
                  sizes="(max-width: 1024px) 100vw, 22vw"
                  className="w-full rounded-xl transition-transform duration-500 group-hover:scale-[1.02] object-cover"
                  priority={index === 0}
                  quality={85}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                  <Image
                    src={category.image}
                    alt={`آیکون ${category.name}`}
                    width={140}
                    height={140}
                    sizes="(max-width: 640px) 140px, (max-width: 1024px) 120px, 130px"
                    className="w-33 xs:w-38 sm:w-40 md:w-32 lg:w-29 xl:w-32 mb-1 rounded-full -mt-3 md:mb-1"
                    loading="lazy"
                    quality={75}
                  />
                  <span className="text-[#334155] text-2xl xs:text-3xl sm:text-lg md:text-lg lg:text-lg font-bold px-3 md:pb-1 sm:pb-0 mt-2 md:mt-0 text-center">
                    {category.name}
                  </span>
                </div>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-[78%] relative" ref={containerRef}>
            <button
              className={`${prevClass} cat-nav absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer group hidden md:flex items-center justify-center right-0 right-full`}
              style={{ width: '40px', height: '40px' }}
              aria-label="محصولات قبلی"
              type="button"
            >
              <Image
                src={IMAGES.navigation}
                alt=""
                width={28}
                height={64}
                className="transition-opacity duration-300 -mr-2"
                loading="lazy"
                aria-hidden="true"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold">
                ›
              </span>
            </button>

            <div className="relative">
              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                modules={[Navigation, Autoplay]}
                spaceBetween={12}
                slidesPerView={2}
                breakpoints={BREAKPOINTS}
                navigation={{
                  nextEl: `.${nextClass}`,
                  prevEl: `.${prevClass}`,
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={products.length > 4}
                className={sliderClass}
                lazyPreloadPrevNext={2}
                watchSlidesProgress
              >
                {products.map((product) => (
                  <SwiperSlide key={product.id} className="!h-auto">
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      isLoading={isPending && loadingProductId === product.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <button
              className={`${nextClass} cat-nav absolute top-1/2 -translate-y-1/2 z-20 cursor-pointer group hidden md:flex items-center justify-center left-0 left-full`}
              style={{ width: '40px', height: '40px' }}
              aria-label="محصولات بعدی"
              type="button"
            >
              <Image
                src={IMAGES.navigation}
                alt=""
                width={28}
                height={64}
                className="transition-opacity duration-300 rotate-[180deg] -ml-2"
                loading="lazy"
                aria-hidden="true"
              />
              <span className="absolute inset-0 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold drop-shadow-md">
                ‹
              </span>
            </button>
          </div>
        </div>

        <style jsx>{`
          .${sliderClass} :global(.swiper) {
            overflow: visible !important;
            padding: 5px 0;
          }
          .${sliderClass} :global(.swiper-slide) {
            height: auto !important;
          }
          .${prevClass},
          .${nextClass} {
            transform: translateY(-50%);
          }
          .${prevClass}.right-full {
            right: 100%;
          }
          .${nextClass}.left-full {
            left: 100%;
          }

          @media (max-width: 1023px) {
            .${prevClass},
            .${nextClass} {
              display: none !important;
            }
          }

          @media (max-width: 767px) {
            .${sliderClass} :global(.swiper-slide) {
              margin-bottom: 0 !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
});
CategorySlider.displayName = 'CategorySlider';

// Main Component
const CategoryProductSlider = ({ limit = 3 }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategoriesData();
        if (categoriesData?.categories?.length) {
          setCategories(categoriesData.categories);
        }
      } catch (error) {
        console.warn('خطا در دریافت دسته‌بندی‌ها:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) return <CategoryProductSliderSkeleton />;
  if (!categories.length) return null;

  return (
    <>
      {categories.slice(0, limit).map((category, index) => (
        <CategorySlider key={category.id} category={category} index={index} />
      ))}
    </>
  );
};

export default memo(CategoryProductSlider);