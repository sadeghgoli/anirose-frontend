// src/components/common/ProductDetail/ProductDetailSkeleton.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductDetailSkeleton = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-wrap gap-8">
                <div className="flex-1 min-w-[280px]">
                    <Skeleton height={350} className="rounded-xl" />
                    <div className="flex gap-3 mt-3">
                        {[1, 2, 3].map(i => <Skeleton key={i} width={64} height={64} className="rounded-lg" />)}
                    </div>
                </div>
                <div className="flex-1 min-w-[280px]">
                    <Skeleton height={36} width="80%" className="mb-2" />
                    <Skeleton height={24} width="50%" className="mb-4" />
                    <Skeleton height={40} width="40%" className="mb-4" />
                    <Skeleton count={3} className="mb-4" />
                    <div className="flex gap-4">
                        <Skeleton width={120} height={42} />
                        <Skeleton width={140} height={42} />
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="flex gap-2 border-b pb-2">
                    <Skeleton width={80} height={32} />
                    <Skeleton width={80} height={32} />
                    <Skeleton width={80} height={32} />
                </div>
                <div className="mt-4">
                    <Skeleton count={3} />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailSkeleton;