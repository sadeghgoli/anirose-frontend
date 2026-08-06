import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoriesSkeleton = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center">

                {/* اسکلتون بخش عنوان */}
                <div className="relative min-h-[1px]">
                    <div className="w-full max-w-[300px] mx-auto text-center">
                        {/* تصویر بالا */}
                        <div className="mb-2 flex justify-center">
                            <Skeleton
                                circle
                                width={50}
                                height={50}
                                className="sm:w-[60px] sm:h-[60px] lg:w-[70px] lg:h-[70px]"
                            />
                        </div>

                        {/* تیتر انگلیسی */}
                        <div className="flex justify-center mb-1">
                            <Skeleton
                                width={100}
                                height={10}
                                className="sm:w-[120px] sm:h-[12px] lg:w-[140px] lg:h-[14px]"
                            />
                        </div>

                        {/* بک‌گراند و تیتر فارسی */}
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2">
                            <Skeleton
                                width={120}
                                height={14}
                                className="sm:w-[140px] sm:h-[16px] lg:w-[160px] lg:h-[18px] mx-auto"
                            />
                        </div>

                        {/* تصویر پایین */}
                        <div className="flex justify-center mt-[-28px] sm:mt-[-38px] lg:mt-[-40px]">
                            <Skeleton
                                width={40}
                                height={40}
                                className="sm:w-[60px] sm:h-[60px] lg:w-[80px] lg:h-[80px]"
                            />
                        </div>
                    </div>
                </div>

                {/* اسکلتون 3 دسته بندی */}
                {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="block group">
                        <div className="relative rounded-2xl overflow-hidden">
                            <Skeleton
                                height={280}
                                className="w-full aspect-square"
                            />
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <Skeleton
                                    circle
                                    width={80}
                                    height={80}
                                    className="sm:w-[96px] sm:h-[96px] lg:w-[112px] lg:h-[112px]"
                                />
                                <Skeleton
                                    width={60}
                                    height={24}
                                    className="mt-2 rounded-full sm:w-[70px] sm:h-[28px] lg:w-[80px] lg:h-[32px]"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSkeleton;