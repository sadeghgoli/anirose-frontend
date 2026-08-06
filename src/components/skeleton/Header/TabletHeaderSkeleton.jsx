import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TabletHeaderSkeleton = () => {
    return (
        <div className="bg-white shadow-sm border-b border-gray-100 max-w-7xl mx-auto px-4 lg:px-8">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="px-4 py-1 flex justify-center">
                    <Skeleton width={200} height={14} borderRadius={7} />
                </div>
            </div>

            <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Menu Icon */}
                    <Skeleton width={40} height={40} borderRadius={8} />

                    {/* Logo */}
                    <Skeleton width={70} height={45} borderRadius={10} />

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Skeleton circle width={40} height={40} />
                        <Skeleton circle width={40} height={40} />
                        <Skeleton circle width={40} height={40} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabletHeaderSkeleton;