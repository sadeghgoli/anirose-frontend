import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AboutSectionSkeleton = () => {
    return (
        <section className="relative w-full py-12 md:py-16 lg:py-20 bg-gray-100">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">

                    {/* ستون راست - متن و آمار */}
                    <div className="w-full lg:w-1/2">
                        {/* تصویر بالا */}
                        <div className="text-center mb-4">
                            <Skeleton width={92} height={62} className="mx-auto" />
                        </div>

                        {/* تیتر اصلی */}
                        <div className="text-center mb-4">
                            <Skeleton width={300} height={40} className="mx-auto" />
                        </div>

                        {/* متن توضیحی */}
                        <div className="text-center mb-8">
                            <Skeleton count={3} className="mx-auto w-full max-w-2xl" />
                        </div>

                        {/* سه باکس آمار */}
                        <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex-1 bg-white/90 rounded-2xl p-4 md:p-6 text-center">
                                    <Skeleton width={60} height={48} className="mx-auto" />
                                    <Skeleton width={100} height={24} className="mx-auto mt-2" />
                                    <Skeleton width={80} height={16} className="mx-auto mt-1" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ستون چپ - تصویر */}
                    <div className="w-full lg:w-1/2">
                        <Skeleton height={400} borderRadius={16} className="w-full max-w-lg lg:max-w-full mx-auto" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSectionSkeleton;