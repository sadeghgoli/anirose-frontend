// src/components/skeleton/Shop/ProductSkeleton.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductSkeleton = () => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <Skeleton height={256} className="w-full" />
            <div className="p-4">
                <Skeleton width={80} height={16} className="mb-2" />
                <Skeleton width={180} height={20} className="mb-2" />
                <Skeleton width={80} height={14} className="mb-2" />
                <Skeleton width={120} height={24} className="mb-3" />
                <Skeleton height={40} borderRadius={8} />
            </div>
        </div>
    );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(count)].map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    );
};

export default ProductSkeleton;