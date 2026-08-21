import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const WhyChooseUsSkeleton = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 py-8">
            {/* عنوان اسکلتون */}
            <div className="text-center mb-12">
                <div className="mb-3">
                    <Skeleton width={92} height={62} className="mx-auto" />
                </div>
                <Skeleton width={200} height={20} className="mx-auto mb-2" />
                <Skeleton width={280} height={36} className="mx-auto" />
            </div>

            {/* سه باکس اسکلتون */}
            <div className="flex flex-wrap -mx-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="w-full md:w-1/3 px-4 mb-8 md:mb-0 text-center">
                        <div className="flex justify-center mb-4">
                            <Skeleton circle width={80} height={80} />
                        </div>
                        <Skeleton width="70%" height={24} className="mx-auto mb-3" />
                        <Skeleton count={3} className="mx-auto w-11/12" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WhyChooseUsSkeleton;