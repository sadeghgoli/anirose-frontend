import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AniroseStatsSkeleton = () => {
    return (
        <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden bg-gray-50">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">

                {/* لوگوها */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                    <Skeleton width={160} height={80} />
                    <div className="flex items-center gap-4">
                        <Skeleton width={62} height={92} />
                        <Skeleton width={200} height={60} />
                        <Skeleton width={62} height={92} />
                    </div>
                </div>

                {/* متن توضیحی */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <Skeleton count={4} className="mb-2" />
                </div>

                {/* چهار باکس */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-md">
                            <Skeleton width="80%" height={24} className="mx-auto mb-4" />
                            <div className="flex items-center justify-center gap-2">
                                <Skeleton width={40} height={20} />
                                <Skeleton width={60} height={40} />
                                <Skeleton width={60} height={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AniroseStatsSkeleton;