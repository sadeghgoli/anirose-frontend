// src/components/common/Checkout/CartSkeleton.jsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CartPageSkeleton = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4">
                {/* عنوان */}
                <Skeleton width={200} height={36} className="mb-8" />

                {/* ========== دسکتاپ - اسکلتون جدولی ========== */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border border-gray-300 border-collapse">
                        <thead className="bg-gray-100">
                        <tr>
                            <th className="border-b border-gray-300 p-3 text-right"><Skeleton width={30} /></th>
                            <th className="border-b border-gray-300 p-3 text-right"><Skeleton width={60} /></th>
                            <th className="border-b border-gray-300 p-3 text-right"><Skeleton width={80} /></th>
                            <th className="border-b border-gray-300 p-3 text-right"><Skeleton width={80} /></th>
                            <th className="border-b border-gray-300 p-3 text-right"><Skeleton width={60} /></th>
                            <th className="border-b border-gray-300 p-3 text-right"><Skeleton width={80} /></th>
                        </tr>
                        </thead>
                        <tbody>
                        {[...Array(3)].map((_, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                                <td className="border-b border-gray-300 p-3 text-center"><Skeleton width={24} height={24} circle /></td>
                                <td className="border-b border-gray-300 p-3"><Skeleton width={64} height={64} /></td>
                                <td className="border-b border-gray-300 p-3"><Skeleton width={150} /></td>
                                <td className="border-b border-gray-300 p-3"><Skeleton width={100} /></td>
                                <td className="border-b border-gray-300 p-3"><Skeleton width={80} height={34} /></td>
                                <td className="border-b border-gray-300 p-3"><Skeleton width={100} /></td>
                            </tr>
                        ))}
                        </tbody>
                        <tfoot>
                        <tr className="bg-gray-50">
                            <td colSpan="6" className="border border-gray-300 p-3">
                                <div className="flex justify-between items-center gap-4">
                                    <div className="flex flex-wrap gap-3 items-end flex-1">
                                        <div className="flex-1 min-w-[200px]">
                                            <div className="relative">
                                                <Skeleton width={20} height={20} className="absolute right-3 top-1/2 -translate-y-1/2" />
                                                <Skeleton height={45} className="w-full" />
                                            </div>
                                        </div>
                                        <Skeleton width={130} height={45} />
                                    </div>
                                    <Skeleton width={160} height={45} />
                                </div>
                            </td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

                {/* ========== موبایل - اسکلتون کارتی/ستونی ========== */}
                <div className="block md:hidden max-h-[500px] overflow-y-auto">
                    {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="border border-gray-300 mb-4 p-3 bg-white">
                            {/* دکمه حذف */}
                            <div className="flex justify-start mb-3">
                                <Skeleton width={24} height={24} circle />
                            </div>

                            {/* تصویر + نام محصول */}
                            <div className="flex items-center gap-3 mb-3">
                                <Skeleton width={64} height={64} />
                                <div className="flex-1 text-right">
                                    <Skeleton width={150} height={20} className="mb-1" />
                                </div>
                            </div>

                            {/* قیمت */}
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <Skeleton width={50} height={18} />
                                <Skeleton width={100} height={18} />
                            </div>

                            {/* تعداد */}
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <Skeleton width={50} height={18} />
                                <Skeleton width={80} height={34} />
                            </div>

                            {/* جمع جزء */}
                            <div className="flex justify-between pt-2 mt-2 border-t border-dashed border-gray-300">
                                <Skeleton width={60} height={20} />
                                <Skeleton width={100} height={20} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* ========== سایدبار جمع کل (دسکتاپ و موبایل) ========== */}
                <div className="mt-8 flex justify-end">
                    <div className="w-full md:w-1/2 border border-gray-300 bg-white p-5">
                        <div className="w-full">
                            <Skeleton width={180} height={28} className="mb-4 pb-2" />
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <Skeleton width={80} height={20} />
                                    <Skeleton width={120} height={20} />
                                </div>
                                <div className="flex justify-between">
                                    <Skeleton width={80} height={20} />
                                    <Skeleton width={120} height={20} />
                                </div>
                                <div className="border-t border-b border-gray-200 pt-3 pb-2 flex justify-between">
                                    <Skeleton width={60} height={24} />
                                    <Skeleton width={130} height={28} />
                                </div>
                            </div>
                            <Skeleton height={56} className="mt-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPageSkeleton;