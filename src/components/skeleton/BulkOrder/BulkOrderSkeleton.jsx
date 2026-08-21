import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BulkOrderSkeleton = () => {
    return (
        <div className="relative w-full py-10 overflow-x-clip">
            <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    <div className="text-center mb-6">
                        <Skeleton width={100} height={20} className="mx-auto mb-2" />
                        <Skeleton width={250} height={32} className="mx-auto mb-3" />
                        <Skeleton circle width={64} height={64} className="mx-auto" />
                        <Skeleton count={2} className="mt-4" />
                    </div>
                    <div className="space-y-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i}>
                                <Skeleton width={180} height={24} className="mb-4" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[1, 2].map((j) => (
                                        <div key={j}>
                                            <Skeleton width={120} height={16} className="mb-1" />
                                            <Skeleton height={48} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        <Skeleton height={56} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BulkOrderSkeleton;