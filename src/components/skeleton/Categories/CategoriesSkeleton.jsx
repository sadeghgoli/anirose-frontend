import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoriesSkeleton = () => {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-8">
            <div className="mb-10 flex justify-center">
                <Skeleton width={160} height={24} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(4)].map((_, idx) => (
                    <div key={idx} className="aspect-square w-full">
                        <Skeleton height="100%" borderRadius={16} containerClassName="block h-full leading-none" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategoriesSkeleton;