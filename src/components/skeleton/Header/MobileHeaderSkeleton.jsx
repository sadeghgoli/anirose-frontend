import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MobileHeaderSkeleton = () => {
    return (
        <>
            {/* Main Header */}
            <div className="bg-white shadow-sm border-b border-gray-100">
                <div className="px-4 py-3">
                    <div className="flex items-center justify-between">
                        {/* Menu Icon */}
                        <Skeleton width={38} height={38} borderRadius={8} />

                        {/* Logo */}
                        <Skeleton width={56} height={40} borderRadius={10} />

                        {/* Checkout Icon */}
                        <Skeleton circle width={38} height={38} />
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Skeleton */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30 md:hidden">
                <div className="flex items-center justify-around py-3 px-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                            <Skeleton circle width={20} height={20} />
                            <Skeleton width={40} height={12} borderRadius={6} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default MobileHeaderSkeleton;