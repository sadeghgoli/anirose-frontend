'use client'
// src/components/common/Checkout/CouponCheckout.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag , AlertCircle  } from 'react-feather';

const CouponCheckout = ({ onApplyCoupon, updating }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [localError, setLocalError] = useState(null);
    const [localSuccess, setLocalSuccess] = useState(null);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!couponCode.trim()) {
            setLocalError('لطفاً کد تخفیف را وارد کنید');
            setTimeout(() => setLocalError(null), 3000);
            return;
        }
        setLocalError(null);
        setLocalSuccess(null);

        const result = await onApplyCoupon(couponCode);
        if (result) {
            setLocalSuccess('کد تخفیف با موفقیت اعمال شد');
            setCouponCode('');
            setTimeout(() => setLocalSuccess(null), 3000);
        }
    };

    return (
        <div className="border-t-3 bg-gray-100 border-gray-500 mb-6">
            {/* قسمت اطلاع کد تخفیف */}
            <div className="px-6 py-4 bg-gray-50">
                <span className="text-gray-700 flex justify-start items-center">
<AlertCircle size={20}/>
                    کد تخفیف دارید؟
                    <button
                        onClick={toggleOpen}
                        className="text-gray-500 mr-2 focus:outline-none transition-colors duration-200"
                    >
                        برای نوشتن کد اینجا کلیک کنید
                    </button>
                </span>
            </div>

            {/* فرم کد تخفیف با انیمیشن */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="flex flex-wrap gap-3 items-end">
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
                                            className="w-full pr-10 pl-4 py-2.5 border border-gray-300 focus:outline-none focus:border-[#64a39a] disabled:bg-gray-100 transition-all duration-200"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    disabled={updating}
                                    className="px-6 py-2.5 bg-[#64a39a] text-white hover:bg-[#4a7d73] transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {updating ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            در حال اعمال...
                                        </>
                                    ) : 'اعمال کد تخفیف'}
                                </button>
                            </div>
                            {localError && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-sm mt-3"
                                >
                                    {localError}
                                </motion.p>
                            )}
                            {localSuccess && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-green-600 text-sm mt-3"
                                >
                                    {localSuccess}
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CouponCheckout;
