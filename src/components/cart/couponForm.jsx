'use client'
// src/components/common/Checkout/CouponForm.jsx
import React, { useState } from 'react';
import { Tag } from 'react-feather';

const CouponForm = ({ onApplyCoupon, updating, error, successMessage }) => {
    const [couponCode, setCouponCode] = useState('');
    const [localError, setLocalError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!couponCode.trim()) {
            setLocalError('لطفاً کد تخفیف را وارد کنید');
            setTimeout(() => setLocalError(null), 3000);
            return;
        }
        setLocalError(null);
        await onApplyCoupon(couponCode);
        if (!error) setCouponCode('');
    };

    const displayError = error || localError;

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[200px]">
                <div className="relative">
                    <Tag size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="کد تخفیف خود را وارد کنید"
                        aria-label="کد تخفیف"
                        disabled={updating}
                        className="w-full pr-10 pl-4 py-2.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64a39a]/20 focus:border-[#64a39a] disabled:bg-gray-100"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={updating}
                className="px-6 py-2.5 bg-[#64a39a] text-white hover:bg-[#4a7d73] transition-colors disabled:opacity-50 flex items-center gap-2"
            >
                {updating ? (
                    <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        در حال اعمال...
                    </>
                ) : 'اعمال کد تخفیف'}
            </button>
            {displayError && (
                <div className="w-full mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {displayError}
                </div>
            )}
            {successMessage && !localError && (
                <div className="w-full mt-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                    {successMessage}
                </div>
            )}
        </form>
    );
};

export default CouponForm;
