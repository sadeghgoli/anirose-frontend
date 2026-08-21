import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogSkeleton = () => {
    return (
        <div className="min-h-[60vh] bg-[#F8F9FB] py-10">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
                <Skeleton width={220} height={32} className="mx-auto mb-8" />

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <Skeleton height={192} />
                            <div className="p-5">
                                <Skeleton width="85%" height={20} className="mb-2" />
                                <Skeleton width="60%" height={20} className="mb-4" />
                                <Skeleton width={110} height={34} borderRadius={8} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BlogSkeleton;
