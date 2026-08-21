import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DesktopHeaderSkeleton = () => {
    return (
        <div className="bg-white shadow-sm border-b border-gray-100">
            {/* Top Bar Skeleton */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-center">
                    <Skeleton width={250} height={16} borderRadius={8} />
                </div>
                <div className="border-t border-emerald-100/50" />
            </div>

            {/* Main Header Skeleton */}
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="grid grid-cols-12 gap-4 items-center">

                    {/* Column 1: Menu Items */}
                    <div className="col-span-4">
                        <div className="flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} width={70} height={34} borderRadius={8} />
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Logo */}
                    <div className="col-span-4 flex justify-center">
                        <Skeleton width={70} height={50} borderRadius={12} />
                    </div>

                    {/* Column 3: Actions */}
                    <div className="col-span-4">
                        <div className="flex items-center justify-end gap-3">
                            {/* Search */}
                            <Skeleton width={192} height={38} borderRadius={8} />

                            {/* Checkout Icon */}
                            <Skeleton circle width={40} height={40} />

                            {/* User Button */}
                            <Skeleton width={110} height={38} borderRadius={8} />
                        </div>

                        {/* Secondary Menu Skeleton */}
                        <div className="border-t border-gray-100 mt-3 pt-3" />
                        <div className="flex items-center justify-end gap-2">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} width={55} height={24} borderRadius={6} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopHeaderSkeleton;