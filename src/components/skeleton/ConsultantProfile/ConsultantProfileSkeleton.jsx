import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ConsultantProfileSkeleton = () => {
    return (
        <section>
            <div className="flex gap-5 max-w-[1200px] mx-auto p-5 max-lg:flex-col">
                {/* ستون رزومه */}
                <div className="flex-1 bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] p-6 max-sm:p-4">
                    {/* هدر پروفایل */}
                    <div className="flex items-center gap-6 px-8 pb-5 -mt-12 mb-5 max-lg:flex-col max-lg:-mt-8 max-lg:px-0">
                        <Skeleton circle width={120} height={120} />
                        <div className="flex-1 max-lg:text-center">
                            <Skeleton width={180} height={36} borderRadius={8} />
                            <Skeleton width={220} height={28} borderRadius={20} className="mt-2" />
                            <Skeleton width={150} height={20} borderRadius={8} className="mt-2" />
                        </div>
                    </div>

                    {/* اطلاعات تماس */}
                    <div className="bg-gray-50 rounded-xl p-5 my-5">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex py-2.5 border-b border-gray-200 last:border-b-0">
                                <Skeleton width={130} height={20} borderRadius={6} />
                                <Skeleton width="60%" height={20} borderRadius={6} className="mr-4" />
                            </div>
                        ))}
                    </div>

                    {/* رزومه */}
                    {[1, 2, 3].map((section) => (
                        <div key={section} className="mb-5">
                            <Skeleton width={180} height={24} borderRadius={6} className="mb-3" />
                            <Skeleton count={4} height={20} borderRadius={6} className="mb-2" />
                        </div>
                    ))}

                    {/* نظرات */}
                    <div className="mt-8">
                        <Skeleton width={200} height={24} borderRadius={6} className="mb-4" />
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-4 mb-4">
                                <Skeleton width="40%" height={20} borderRadius={6} className="mb-2" />
                                <Skeleton count={2} height={16} borderRadius={6} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ستون فرم */}
                <div className="flex-1 bg-white rounded-2xl shadow-[0_5px_20px_rgba(0,0,0,0.05)] p-6 max-sm:p-4">
                    <div className="text-center mb-6">
                        <Skeleton width={250} height={32} borderRadius={8} className="mx-auto" />
                        <Skeleton width="80%" height={20} borderRadius={6} className="mx-auto mt-2" />
                    </div>

                    <div className="space-y-4">
                        <Skeleton height={50} borderRadius={8} />
                        <div className="grid grid-cols-2 gap-4">
                            <Skeleton height={50} borderRadius={8} />
                            <Skeleton height={50} borderRadius={8} />
                        </div>
                        <Skeleton height={50} borderRadius={8} />
                        <Skeleton height={50} borderRadius={8} />
                        <Skeleton height={50} borderRadius={8} />
                        <Skeleton height={100} borderRadius={8} />
                        <Skeleton height={50} borderRadius={8} />
                        <Skeleton height={50} borderRadius={8} />
                        <Skeleton height={50} borderRadius={8} />
                        <Skeleton height={100} borderRadius={8} />
                        <Skeleton height={50} borderRadius={8} />
                        <Skeleton height={20} borderRadius={6} width="40%" />
                        <Skeleton height={20} borderRadius={6} width="60%" className="mb-2" />
                        <Skeleton height={50} borderRadius={8} />
                        <Skeleton height={40} borderRadius={8} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConsultantProfileSkeleton;