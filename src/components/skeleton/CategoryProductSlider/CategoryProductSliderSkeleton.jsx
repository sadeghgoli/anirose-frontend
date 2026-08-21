import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoryProductSliderSkeleton = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-stretch">
                {/* اسکلتون بنر (اول در موبایل) */}
                <div className="w-full lg:w-[22%] order-1 lg:order-1">
                    <div className="relative w-full mx-auto lg:mx-0 h-full min-h-[280px] lg:min-h-[400px]">
                        <Skeleton
                            height="100%"
                            borderRadius={12}
                            className="!block !w-full !h-full"
                            containerClassName="!h-full"
                        />
                    </div>
                </div>

                {/* اسکلتون اسلایدر (دوم در موبایل) */}
                <div className="w-full lg:w-[78%] order-2 lg:order-2">
                    <div className="flex justify-center mb-4">
                        <Skeleton
                            width={50}
                            height={50}
                            circle={true}
                        />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
                                <Skeleton height={150} borderRadius={0} />
                                <div className="p-3 text-center">
                                    <Skeleton
                                        width="80%"
                                        height={16}
                                        className="mx-auto mb-2 !bg-gray-200"
                                    />
                                    <Skeleton
                                        width="60%"
                                        height={20}
                                        className="mx-auto mb-2 !bg-gray-200"
                                    />
                                    <Skeleton
                                        width="70%"
                                        height={32}
                                        className="mx-auto !bg-gray-200"
                                        borderRadius="md"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <Skeleton
                            width={50}
                            height={50}
                            circle={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryProductSliderSkeleton;