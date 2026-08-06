// src/components/common/Checkout/CheckoutSkeleton.jsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CheckoutSkeleton = () => {
    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <Skeleton width={200} height={36} className="mx-auto mb-8" />

                <div className="flex flex-wrap gap-8">
                    {/* فرم سمت راست */}
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <Skeleton width={180} height={28} className="mb-6 pb-2" />

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div><Skeleton height={50} /></div>
                                <div><Skeleton height={50} /></div>
                            </div>

                            <Skeleton height={50} className="mb-4" />
                            <Skeleton height={50} className="mb-4" />

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div><Skeleton height={50} /></div>
                                <div><Skeleton height={50} /></div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div><Skeleton height={50} /></div>
                                <div><Skeleton height={50} /></div>
                            </div>

                            <Skeleton height={100} className="mb-6" />
                            <Skeleton height={56} className="mt-4" />
                        </div>
                    </div>

                    {/* خلاصه سفارش سمت چپ */}
                    <div className="w-96">
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <Skeleton width={160} height={24} className="mb-4 pb-2" />
                            <div className="space-y-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="flex justify-between">
                                        <Skeleton width={120} height={20} />
                                        <Skeleton width={100} height={20} />
                                    </div>
                                ))}
                                <div className="border-t pt-3 flex justify-between">
                                    <Skeleton width={80} height={24} />
                                    <Skeleton width={130} height={28} />
                                </div>
                            </div>
                            <Skeleton height={50} className="mt-5" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSkeleton;