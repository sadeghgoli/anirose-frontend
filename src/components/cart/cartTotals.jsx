// src/components/common/Checkout/CartTotals.jsx
import React from 'react';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CartTotals = ({ subtotal, discount, total, shippingFee, couponCode, loading }) => {
    const formatPrice = (price) => (price || 0).toLocaleString() + ' تومان';

    if (loading) {
        return (
            <div className="w-full">
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    <Skeleton width={180} height={28} />
                </h2>
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
        );
    }

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                جمع کل سبد خرید
            </h2>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">جمع جزء</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">
                            تخفیف {couponCode && <span className="text-xs text-green-600">({couponCode})</span>}
                        </span>
                        <span className="text-red-500">-{formatPrice(discount)}</span>
                    </div>
                )}
                {shippingFee > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">هزینه ارسال</span>
                        <span className="font-medium">{formatPrice(shippingFee)}</span>
                    </div>
                )}
                <div className="border-t border-b border-gray-200 pt-3 pb-2 flex justify-between">
                    <span className="text-lg font-bold">مجموع</span>
                    <span className="text-xl font-bold text-[#64a39a]">{formatPrice(total)}</span>
                </div>
            </div>
            <Link
                href="/checkout"
                className="block w-full mt-5 bg-[#64a39a] text-white text-center py-6 font-semibold hover:bg-[#4a7d73] transition-colors"
            >
                همین الان خرید کنید
            </Link>
        </div>
    );
};

export default CartTotals;