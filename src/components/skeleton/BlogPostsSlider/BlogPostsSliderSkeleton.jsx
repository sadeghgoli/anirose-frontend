import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlogPostsSliderSkeleton = () => {
    return (
        <section className="relative w-full py-12 md:py-16 overflow-hidden bg-gray-50">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 lg:px-8">
                <div className="text-center mb-4">
                    <Skeleton circle width={80} height={80} className="mx-auto" />
                </div>
                <Skeleton width={150} height={20} className="mx-auto mb-2" />
                <Skeleton width={250} height={36} className="mx-auto mb-8" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
                            <Skeleton height={250} />
                            <div className="p-5 text-center">
                                <Skeleton width="80%" height={24} className="mx-auto mb-3" />
                                <Skeleton width={50} height={2} className="mx-auto mb-4" />
                                <Skeleton width={100} height={36} className="mx-auto" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogPostsSliderSkeleton;