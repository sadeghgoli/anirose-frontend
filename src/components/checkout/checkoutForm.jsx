'use client'
// src/components/common/Checkout/CheckoutForm.jsx
import React, { useState } from 'react';
import { MapPin, Truck, FileText } from 'react-feather';

const CheckoutForm = ({
                          addresses,
                          selectedAddressId,
                          onSelectAddress,
                          shippingMethods,
                          selectedShippingId,
                          onSelectShipping,
                          updating,
                          onSubmit,
                          onSubmitOrder
                      }) => {
    const [notes, setNotes] = useState('');
    const [serverError, setServerError] = useState(null);

    const handleSubmit = async (e) => {
        e?.preventDefault?.();
        setServerError(null);
        const result = await onSubmit({ address_id: selectedAddressId, notes });
        if (!result?.success) {
            setServerError(result?.error);
        }
    };

    const handleSubmitRef = React.useRef(null);

    React.useEffect(() => {
        handleSubmitRef.current = handleSubmit;
    });

    React.useEffect(() => {
        if (onSubmitOrder) {
            onSubmitOrder(handleSubmitRef.current);
        }
    }, [onSubmitOrder]);

    return (
        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            {/* انتخاب آدرس */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <MapPin size={18} className="text-[#64a39a]" />
                        آدرس ارسال
                    </h4>
                    <a href="/addresses" className="text-sm text-[#64a39a] hover:underline">
                        مدیریت آدرس‌ها
                    </a>
                </div>

                {addresses.length === 0 ? (
                    <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
                        <p className="mb-2">هنوز آدرسی ثبت نکرده‌اید.</p>
                        <a href="/addresses" className="text-[#64a39a] font-semibold underline">
                            برای ثبت سفارش ابتدا یک آدرس اضافه کنید
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {addresses.map((addr) => (
                            <button
                                type="button"
                                key={addr.id}
                                onClick={() => onSelectAddress(addr.id)}
                                disabled={updating}
                                className={`text-right p-4 border-2 rounded-lg transition-all duration-200 ${
                                    selectedAddressId === addr.id
                                        ? 'border-[#64a39a] bg-[#64a39a]/5'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">
                                            {addr.name} {addr.last_name}
                                            {addr.is_default && (
                                                <span className="mr-2 text-[11px] bg-[#64a39a]/10 text-[#64a39a] px-2 py-0.5 rounded-full">پیش‌فرض</span>
                                            )}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            {addr.province_name ? `${addr.province_name}، ` : ''}{addr.address}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">کد پستی: {addr.postal_code}</p>
                                    </div>
                                    <span className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        selectedAddressId === addr.id ? 'border-[#64a39a]' : 'border-gray-300'
                                    }`}>
                                        {selectedAddressId === addr.id && (
                                            <span className="w-2 h-2 bg-[#64a39a] rounded-full" />
                                        )}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* انتخاب روش ارسال */}
            {shippingMethods.length > 0 && (
                <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Truck size={18} className="text-[#64a39a]" />
                        روش ارسال
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {shippingMethods.map((method) => (
                            <button
                                type="button"
                                key={method.id}
                                onClick={() => onSelectShipping(method.id)}
                                disabled={updating}
                                className={`text-right p-4 border-2 rounded-lg transition-all duration-200 ${
                                    selectedShippingId === method.id
                                        ? 'border-[#64a39a] bg-[#64a39a]/5'
                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-800">{method.name}</p>
                                        {method.description && (
                                            <p className="text-xs text-gray-500 mt-1">{method.description}</p>
                                        )}
                                        <p className="text-sm text-[#64a39a] mt-1">
                                            {(method.cost || 0).toLocaleString()} تومان
                                        </p>
                                    </div>
                                    <span className={`mt-1 flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                        selectedShippingId === method.id ? 'border-[#64a39a]' : 'border-gray-300'
                                    }`}>
                                        {selectedShippingId === method.id && (
                                            <span className="w-2 h-2 bg-[#64a39a] rounded-full" />
                                        )}
                                    </span>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* توضیحات سفارش */}
            <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} className="text-[#64a39a] ml-1" />
                    توضیحات سفارش <span className="text-gray-400 text-xs mr-1">(اختیاری)</span>
                </label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#64A39A]/20 focus:border-[#64A39A] resize-none"
                    placeholder="یادداشت‌ها درباره سفارش شما، برای مثال نکات مهم درباره نحوه تحویل سفارش"
                />
            </div>

            {serverError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                    {serverError}
                </div>
            )}
        </form>
    );
};

export default CheckoutForm;
