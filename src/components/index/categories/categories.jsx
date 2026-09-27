"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={`/shop?category=${category.id}`}
                        className="block group"
                        prefetch={false}
                    >
                        <div className="relative rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105">
                            <div className="relative w-full aspect-square">
                                <Image
                                    src="/images/test/1-min-2-1.png"
                                    alt={category.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 50vw, 25vw"
                                    priority={false}
                                />
                            </div>

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
                ))}
            </div>
        </section>
    );
};

export default Categories;