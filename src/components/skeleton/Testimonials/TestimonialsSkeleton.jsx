import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TestimonialsSkeleton = () => {
    return (
        <>
            {/* سکشن اول: عنوان و اسلایدر لوگوها */}
            <section className="relative w-full py-10 md:py-12 overflow-hidden">
                <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
                    {/* آیکون */}
                    <div className="text-center mb-4">
                        <Skeleton circle width={80} height={80} className="mx-auto" />
                    </div>
                    {/* عنوان انگلیسی */}
                    <Skeleton width={200} height={20} className="mx-auto mb-2" />
                    {/* عنوان فارسی */}
                    <Skeleton width={300} height={32} className="mx-auto mb-8" />

                    {/* اسلایدر لوگوها - استفاده از grid به جای flex با عرض ثابت */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="flex justify-center">
                                <Skeleton width={80} height={40} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* سکشن دوم: دیدگاه مشتریان */}
            <section className="relative w-full py-10 md:py-16 bg-gray-50">
                <div className="w-full max-w-7xl mx-auto px-4 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* ستون متن */}
                        <div className="w-full lg:w-5/12">
                            <Skeleton width={200} height={32} className="mb-4" />
                            <Skeleton count={3} className="mb-2" />
                        </div>

                        {/* ستون اسلایدر نظرات */}
                        <div className="w-full lg:w-7/12">
                            <div className="bg-white rounded-2xl p-6 shadow-md">
                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                    <Skeleton circle width={56} height={56} />
                                    <div className="flex-1 min-w-[120px]">
                                        <Skeleton width={120} height={20} />
                                        <Skeleton width={80} height={14} />
                                    </div>
                                    <Skeleton width={100} height={20} className="flex-shrink-0" />
                                </div>
                                <Skeleton count={4} className="mb-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TestimonialsSkeleton;