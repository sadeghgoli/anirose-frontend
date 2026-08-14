"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { fetchCategoriesData } from "../../../utils/api/categoriesService/categoriesService.js";
import CategoriesSkeleton from "../../skeleton/Categories/CategoriesSkeleton.jsx";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await fetchCategoriesData();
            if (data?.categories) setCategories(data.categories);
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <CategoriesSkeleton />;
    if (!categories.length) return null;

    return (
        <section className="w-full max-w-7xl mx-auto px-4 ">
            {/* عنوان */}
            <div className="mb-10">
                <div className="relative min-h-[1px]">
                    <section className="relative">
                        <div className="flex justify-center relative flex-wrap mx-auto">
                            <div className="relative min-h-[1px] w-full flex justify-center">
                                <div className="w-full max-w-[300px] text-center">
                                   

                                    {/* بک‌گراند زیر تیتر فارسی */}
                                    <div
                                        className="px-4 sm:px-6 pt-2 text-center bg-no-repeat bg-center"
                                     
                                    >
                                        <h2 className="text-[16px] font-bold sm:text-[18px] lg:text-[20px] leading-[1.3] m-0 text-[#0c5505] whitespace-nowrap">
                                            دسته بندی محصولات
                                        </h2>
                                    </div>

                                     {/* تصویر بالا */}
                                    <div className="mb-2 flex justify-center">
                                        <Image
                                            src="/images/test/Group-3-min.png"
                                            alt=""
                                            width={70}
                                            height={70}
                                            className="w-[50px] sm:w-[60px] lg:w-[70px] h-auto rotate-[180deg]"
                                            priority={false}
                                        />
                                    </div>

                                    

                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* اسلایدر دسته‌بندی‌ها */}
            <div className="relative">
                <Swiper
                    modules={[Autoplay, Navigation]}
                    spaceBetween={20}
                    slidesPerView={2}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                    }}
                    navigation={{
                        nextEl: '.categories-next',
                        prevEl: '.categories-prev',
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 24,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 24,
                        },
                        1280: {
                            slidesPerView: 4,
                            spaceBetween: 2,
                        },
                    }}
                    className="py-2"
                >
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <Link
                                href={`/shop?category=${category.id}&name=${encodeURIComponent(category.name.replace(/\s+/g, '-'))}`}
                                className="block group"
                                prefetch={false}
                            >
                                <div className="relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
                                    {/* تصویر پس‌زمینه */}
                                    <div className="relative w-full aspect-square">
                                        <Image
                                            src="/images/test/1-min-2-1.png"
                                            alt={category.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                                            priority={false}
                                        />
                                    </div>
                                    
                                    {/* محتوای روی تصویر */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center mb-4">
                                        <div className="relative w-18 h-18 sm:w-22 sm:h-22 lg:w-22 lg:h-22">
                                            <Image
                                                src={category.image || "/images/test/placeholder.jpg"}
                                                alt={category.name}
                                                fill
                                                className="rounded-full object-contain"
                                                sizes="(max-width: 640px) 72px, (max-width: 1024px) 88px, 88px"
                                                priority={false}
                                            />
                                        </div>
                                        <span className="text-[#334155] mt-8 font-bold px-3 sm:px-4 rounded-full text-xs sm:text-sm lg:text-base overflow-hidden text-ellipsis whitespace-nowrap block text-center w-8/10">
    {category.name}
</span>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* دکمه قبلی */}
                <button
                    className="categories-prev absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
                    aria-label="اسلاید قبلی"
                >
                    <svg className="w-5 h-5 text-[#0c5505]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* دکمه بعدی */}
                <button
                    className="categories-next absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center cursor-pointer"
                    aria-label="اسلاید بعدی"
                >
                    <svg className="w-5 h-5 text-[#0c5505]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default Categories;