import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DoubleBannersSkeleton = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 lg:px-8 max-lg:px-4 max-sm:px-2 py-4">
            <div className="grid grid-cols-2 gap-8 max-md:grid-cols-1 max-md:gap-6">
                {[1, 2].map((i) => (
                    <div
                        key={i}
                        className="relative w-full rounded-[20px] overflow-hidden py-6 px-4"
                        style={{ backgroundColor: "#2f2f2f" }}
                    >
                        <div className="flex flex-col gap-3">
                            {/* بج */}
                            <Skeleton
                                width={100}
                                height={34}
                                borderRadius={22}
                                baseColor="#404040"
                                highlightColor="#4a4a4a"
                            />

                            {/* متن */}
                            <Skeleton
                                width="70%"
                                height={40}
                                borderRadius={8}
                                baseColor="#404040"
                                highlightColor="#4a4a4a"
                            />

                            {/* دکمه */}
                            <Skeleton
                                width={90}
                                height={36}
                                borderRadius={14}
                                baseColor="#404040"
                                highlightColor="#4a4a4a"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DoubleBannersSkeleton;