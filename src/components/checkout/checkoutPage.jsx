'use client'
// src/components/common/Checkout/CheckoutPage.jsx
import React, { useRef } from 'react';
import {useRouter} from "next/navigation";
import { useCheckout } from '../../hooks/useCheckout';
import CheckoutForm from './checkoutForm';
import OrderSummary from './orderSummary';
import CouponCheckout from './couponCheckout';
import CheckoutSkeleton from './checkoutSkeleton';

const CheckoutPage = () => {
    const router = useRouter();
    const submitFormRef = useRef(null);

    const {
        cart,
        addresses,
        selectedAddressId,
        setSelectedAddressId,
        shippingMethods,
        selectedShippingId,
        handleSelectShipping,
        loading,
        submitting,
        updating,
        error,
        successMessage,
        orderResult,
        handlePlaceOrder,
        handleApplyCoupon,
        formatPrice
    } = useCheckout();

    const handleSubmitOrderWrapper = async (formData) => {
        return handlePlaceOrder(formData);
    };

    const handleSubmitOrder = () => {
        if (submitFormRef.current) {
            submitFormRef.current();
        }
    };

    if (loading) return <CheckoutSkeleton />;

    if (orderResult) {
        return (
            <div className="bg-gray-50 min-h-screen py-20">
                <div className="container mx-auto px-4 max-w-2xl">
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">سفارش شما با موفقیت ثبت شد!</h2>
                        <p className="text-gray-600 mb-2">شماره سفارش: <span className="font-bold text-[#64a39a]">{orderResult.order_number}</span></p>
                        <p className="text-gray-500 mb-6">مبلغ قابل پرداخت: <span className="font-bold">{formatPrice(orderResult.total)}</span></p>

                        {/* دکمه پرداخت */}
                        {orderResult.gateway_url && (
                            <button
                                onClick={() => window.location.href = orderResult.gateway_url}
                                className="w-full mb-3 bg-[#64a39a] text-white py-3 rounded-lg font-semibold hover:bg-[#4a7d73] transition-colors"
                            >
                                پرداخت آنلاین
                            </button>
                        )}

                        <div className="flex gap-4 justify-center">
                            <button onClick={() => router.push('/shop')} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">ادامه خرید</button>
                            <button onClick={() => router.push('/orders')} className="px-6 py-2 bg-[#64a39a] text-white rounded-lg hover:bg-[#4a7d73] transition-colors">مشاهده سفارشات</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">تسویه حساب</h1>

                {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">{error}</div>}
                {successMessage && <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600">{successMessage}</div>}

                <CouponCheckout onApplyCoupon={handleApplyCoupon} updating={updating} />

                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1">
                        <div className="bg-white rounded-2xl shadow-md p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">جزئیات صورتحساب</h3>
                            <CheckoutForm
                                addresses={addresses}
                                selectedAddressId={selectedAddressId}
                                onSelectAddress={setSelectedAddressId}
                                shippingMethods={shippingMethods}
                                selectedShippingId={selectedShippingId}
                                onSelectShipping={handleSelectShipping}
                                updating={updating}
                                onSubmit={handleSubmitOrderWrapper}
                                submitting={submitting}
                                onSubmitOrder={(fn) => { submitFormRef.current = fn; }}
                            />
                        </div>
                    </div>

                    <div className="lg:w-96">
                        <OrderSummary
                            cart={cart}
                            updating={updating}
                            formatPrice={formatPrice}
                            onSubmitOrder={handleSubmitOrder}
                            submitting={submitting}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
