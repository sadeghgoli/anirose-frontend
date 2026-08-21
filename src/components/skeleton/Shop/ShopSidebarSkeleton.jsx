// src/components/skeleton/Shop/ShopSidebarSkeleton.jsx
import React from "react";
import Skeleton from "react-loading-skeleton";

const ShopSidebarSkeleton = () => {
    return (
        <div className="bg-white w-80 rounded-2xl shadow-sm p-5 sticky top-24">
            {/* فیلترهای فعال */}
            <div className="border-b border-gray-200 pb-4 mb-4">
                <Skeleton width={100} height={20} className="mb-3" />
                <div className="flex gap-2">
                    <Skeleton width={60} height={24} borderRadius={20} />
                    <Skeleton width={60} height={24} borderRadius={20} />
                </div>
            </div>

            {/* دسته‌بندی */}
            <div className="border-b border-gray-200 pb-4 mb-4">
                <Skeleton width={150} height={20} className="mb-3" />
                <div className="space-y-2">
                    <Skeleton width={120} height={18} />
                    <Skeleton width={100} height={18} />
                    <Skeleton width={140} height={18} />
                    <Skeleton width={110} height={18} />
                </div>
            </div>

            {/* خواص */}
            <div className="border-b border-gray-200 pb-4 mb-4">
                <Skeleton width={130} height={20} className="mb-3" />
                <div className="space-y-2">
                    <Skeleton width={80} height={18} />
                    <Skeleton width={70} height={18} />
                    <Skeleton width={90} height={18} />
                    <Skeleton width={100} height={18} />
                </div>
            </div>

            {/* قیمت */}
            <div>
                <Skeleton width={120} height={20} className="mb-3" />
                <Skeleton height={40} className="mb-2" />
                <Skeleton height={40} />
            </div>
        </div>
    );
};

export default ShopSidebarSkeleton;