import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DoctorsPageSkeleton = () => {
    return (
        <div className="ast-container py-10 md:py-12 px-4 lg:px-8">
            <div id="primary" className="content-area primary w-full">
                <main id="main" className="site-main">
                    <article className="post-87 page type-page status-publish ast-article-single" id="post-87">
                        <div className="entry-content clear">
                            <div className="doctors-list-section">

                                {/* هدر اسکلتون */}
                                <div className="text-center mb-6">
                                    <Skeleton width={250} height={40} className="mx-auto mb-3" />
                                    <div className="flex justify-center">
                                        <Skeleton circle width={80} height={80} />
                                    </div>
                                </div>

                                {/* لیست پزشکان اسکلتون */}
                                <div className="flex flex-col gap-7 md:gap-8 mt-8">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="flex flex-col md:flex-row items-center gap-5 md:gap-6 bg-white rounded-2xl p-5 md:p-6 shadow-md border border-gray-100">
                                            <Skeleton circle width={100} height={100} className="md:w-[120px] md:h-[120px]" />
                                            <div className="flex-1 text-center md:text-right">
                                                <Skeleton width={180} height={28} className="mx-auto md:mx-0 mb-2" />
                                                <Skeleton width={120} height={24} className="mx-auto md:mx-0 mb-3 rounded-full" />
                                                <Skeleton count={3} className="mx-auto md:mx-0" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
            </div>
        </div>
    );
};

export default DoctorsPageSkeleton;