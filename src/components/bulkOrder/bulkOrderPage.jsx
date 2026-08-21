"use client";
import Image from "next/image";
import React from "react";
import BulkOrderForm from "./bulkOrderForm";

const BulkOrderPage = () => {
    return (
        <div className="relative w-full py-10 overflow-x-clip">
            {/* بک‌گراند راست */}
            <div
                className="absolute top-0 right-0 w-[90px] h-full z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/test/Frame-41-2.png')",
                    backgroundPosition: "center right",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                }}
            />
            {/* بک‌گراند چپ */}
            <div
                className="absolute top-0 left-0 w-[90px] h-full z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('/images/test/Frame-74.png')",
                    backgroundPosition: "center left",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain",
                }}
            />

            <div className="relative container z-10 max-w-7xl mx-auto px-4 lg:px-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                    {/* هدر */}
                    <div className="text-center mb-6">
                        <h2 className="text-lg font-bold text-[#0C5505] mb-1">Bulk Order</h2>
                        <h1 className="text-2xl md:text-3xl font-semibold text-[#0C5505] mb-3">
                            فروش عمده محصولات آنی‌رز
                        </h1>
                        <Image
                            src="/images/test/Group-3-min.png"
                            alt=""
                            width={64}
                            height={64}
                            className="mx-auto rotate-180"
                         loading="lazy" />
                        <p className="max-w-2xl mx-auto text-gray-600 mt-4">
                            برای ثبت سفارش عمده و دریافت مشاوره تخصصی، فرم زیر را تکمیل کنید. کارشناسان فروش عمده آنی‌رز در اسرع وقت با شما تماس می‌گیرند.
                        </p>
                    </div>

                    {/* فرم */}
                    <BulkOrderForm />
                </div>
            </div>
        </div>
    );
};

export default BulkOrderPage;