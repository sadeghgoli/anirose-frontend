import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeroSliderSkeleton = () => {
    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-8 overflow-visible">
            <div className="relative max-w-[1250px] mx-auto overflow-visible">

                {/* اسکلتون اصلی اسلایدر */}
                <div className="w-full rounded-[20px] bg-gray-100">
                    <div className="flex flex-row items-center max-sm:flex-col-reverse max-sm:gap-4 p-6 max-sm:p-4">

                        {/* سمت متن */}
                        <div className="w-1/2 max-lg:w-[55%] max-sm:w-full">
                            {/* بج */}
                            <div className="mb-3">
                                <Skeleton
                                    width={100}
                                    height={30}
                                    borderRadius={22}
                                    baseColor="#e5e7eb"
                                    highlightColor="#f3f4f6"
                                />
                            </div>

                            {/* عنوان */}
                            <div className="mb-2">
                                <Skeleton
                                    width="70%"
                                    height={40}
                                    borderRadius={8}
                                    baseColor="#e5e7eb"
                                    highlightColor="#f3f4f6"
                                />
                            </div>

                            {/* زیرنویس + برگ */}
                            <div className="flex items-center gap-2 mb-3">
                                <Skeleton
                                    width="50%"
                                    height={20}
                                    borderRadius={8}
                                    baseColor="#e5e7eb"
                                    highlightColor="#f3f4f6"
                                />
                                <Skeleton
                                    width={30}
                                    height={30}
                                    borderRadius={8}
                                    baseColor="#e5e7eb"
                                    highlightColor="#f3f4f6"
                                />
                            </div>

                            {/* دکمه */}
                            <div>
                                <Skeleton
                                    width={130}
                                    height={40}
                                    borderRadius={34}
                                    baseColor="#e5e7eb"
                                    highlightColor="#f3f4f6"
                                />
                            </div>
                        </div>

                        {/* سمت عکس */}
                        <div className="w-1/2 max-lg:w-[45%] max-sm:w-full">
                            <div className="flex justify-center">
                                <Skeleton
                                    width={250}
                                    height={250}
                                    borderRadius={20}
                                    baseColor="#e5e7eb"
                                    highlightColor="#f3f4f6"
                                    className="max-sm:w-[150px] max-sm:h-[150px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* دکمه چپ */}
                <div className="absolute -left-3 lg:-left-6 top-1/2 -translate-y-1/2 z-20">
                    <Skeleton
                        circle={true}
                        width={32}
                        height={32}
                        baseColor="#e5e7eb"
                        highlightColor="#f3f4f6"
                        className="lg:w-12 lg:h-12 shadow-lg"
                    />
                </div>

                {/* دکمه راست */}
                <div className="absolute -right-3 lg:-right-6 top-1/2 -translate-y-1/2 z-20">
                    <Skeleton
                        circle={true}
                        width={32}
                        height={32}
                        baseColor="#e5e7eb"
                        highlightColor="#f3f4f6"
                        className="lg:w-12 lg:h-12 shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSliderSkeleton;