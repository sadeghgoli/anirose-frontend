// src/components/common/Payment/PaymentLoading.jsx
import React from "react";

const PaymentLoading = () => {
    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[15rem]">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* اسکلتون تیک موفقیت */}
                        <div className="text-center pt-8 pb-4">
                            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse inline-flex items-center justify-center mx-auto"></div>
                            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mt-4 mb-2 animate-pulse"></div>
                            <div className="h-5 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
                        </div>

                        {/* محتوا */}
                        <div className="p-6">
                            {/* اسکلتون کد سفارش */}
                            <div className="bg-gray-100 rounded-lg p-5 mb-8">
                                <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
                                    <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                                    <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                                </div>
                            </div>

                            {/* اسکلتون عنوان جدول */}
                            <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>

                            {/* اسکلتون هدر جدول */}
                            <div className="bg-gray-100 rounded-lg p-3 mb-2">
                                <div className="flex justify-between">
                                    <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                                </div>
                            </div>

                            {/* اسکلتون ردیف‌های محصول */}
                            {[...Array(2)].map((_, idx) => (
                                <div key={idx} className="flex justify-between items-center py-4 border-b border-gray-100">
                                    <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                </div>
                            ))}

                            {/* اسکلتون جمع‌بندی و دکمه‌ها */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-6 pt-4">
                                <div className="bg-gray-100 p-4 rounded-xl w-full md:w-auto min-w-[250px]">
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                                        </div>
                                        <div className="flex justify-between">
                                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                        </div>
                                        <div className="flex justify-between pt-2">
                                            <div className="h-5 bg-gray-200 rounded w-32 animate-pulse"></div>
                                            <div className="h-5 bg-gray-200 rounded w-28 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                                    <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentLoading;