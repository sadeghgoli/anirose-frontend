import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SaleSectionSkeleton = () => {
    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 lg:px-8 py-8">
            <div className="relative z-10 bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="text-center py-8 px-4">
                    <Skeleton width={150} height={20} className="mx-auto mb-2" />
                    <Skeleton width={250} height={32} className="mx-auto" />
                    <div className="my-4 hidden md:block">
                        <Skeleton height={10} width="80%" className="mx-auto" />
                    </div>
                    <div className="mt-6 flex justify-center gap-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-gray-50 rounded-lg p-2 text-center w-16">
                                <Skeleton width={30} height={30} className="mx-auto" />
                                <Skeleton width={40} height={12} className="mx-auto mt-1" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-4 pb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow">
                                <Skeleton height={160} />
                                <div className="p-3 text-center">
                                    <Skeleton width="80%" height={16} className="mx-auto mb-2" />
                                    <Skeleton width="60%" height={20} className="mx-auto mb-2" />
                                    <Skeleton width="70%" height={30} className="mx-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SaleSectionSkeleton;