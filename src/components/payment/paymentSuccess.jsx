'use client'
// src/components/common/Payment/PaymentSuccess.jsx
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import {useRouter} from "next/navigation";
import { Copy, Home, Truck } from "react-feather";

const PaymentSuccess = ({ orderData, trackingCode }) => {
    const router = useRouter();
    const successCircleRef = useRef(null);

    const formatPrice = (price) => {
        return (price || 0).toLocaleString() + " تومان";
    };

    const copyOrderCode = () => {
        const code = orderData?.tracking_code;
        if (code) {
            navigator.clipboard.writeText(code);
            alert("کد سفارش کپی شد: " + code);
        }
    };

    useEffect(() => {
        if (successCircleRef.current) {
            successCircleRef.current.style.transform = "scale(0)";
            setTimeout(() => {
                successCircleRef.current.style.transition = "transform 0.5s ease";
                successCircleRef.current.style.transform = "scale(1)";
            }, 100);
        }
    }, []);

    const items = orderData?.items || [];
    const subtotal = orderData?.total_amount || orderData?.subtotal || 0;
    const discount = orderData?.discount_amount || 0;
    const shipping = orderData?.shipping_cost || orderData?.shipping_fee || 0;
    const total = orderData?.final_amount || orderData?.total || 0;

    return (
        <div className="min-h-screen py-10">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[15rem]">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* هدر با تیک موفقیت */}
                        <div className="text-center mb-6">
                            <div
                                ref={successCircleRef}
                                className="w-20 h-20 bg-[#4CAF50] rounded-full inline-flex items-center justify-center text-[45px] text-white mx-auto"
                            >
                                ✓
                            </div>
                            <h1 className="text-[#2c2c2c] text-[1.8rem] mt-4 mb-1">پرداخت موفق</h1>
                            <p className="text-green-500 font-medium m-0">پرداخت شما با موفقیت انجام شد</p>
                        </div>

                        {/* محتوا */}
                        <div className="p-6">
                            {/* کد سفارش */}
                            <div className="bg-gray-50 rounded-lg p-4 text-center mb-6">
                                <span className="text-gray-600 ml-2">کد سفارش:</span>
                                <span className="text-[#e0a96d] font-bold text-lg mx-2">{trackingCode || orderData?.tracking_code}</span>
                                <button
                                    onClick={copyOrderCode}
                                    className="bg-[#e0a96d] text-white px-4 py-1 rounded-lg text-sm hover:bg-[#c9954d] transition inline-flex items-center gap-1"
                                >
                                    <Copy size={14} />
                                    کپی
                                </button>
                            </div>

                            {/* جدول محصولات */}
                            <h3 className="font-bold text-lg text-gray-800 mb-3 border-r-3 border-[#e0a96d] pr-3">📦 اقلام سفارش</h3>

                            <div className="overflow-x-auto mb-6">
                                <table className="min-w-[700px] md:min-w-full border-collapse">
                                    <thead className="bg-gray-100 text-gray-500 border-b-2 border-[#E0A96D]">
                                    <tr>
                                        <th className="p-3 text-center">تصویر</th>
                                        <th className="p-3 text-center">نام محصول</th>
                                        <th className="p-3 text-center">قیمت</th>
                                        <th className="p-3 text-center">تعداد</th>
                                        <th className="p-3 text-center">جمع</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {(items || []).map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-200">
                                            <td className="p-3 text-center border-l-1 border-gray-200">
                                                <Image src={item.image} alt={item.name} width={48} height={48} className="object-cover rounded mx-auto"  loading="lazy" />
                                            </td>
                                            <td className="p-3 text-center border-l-1 border-gray-200 font-medium">{item.name}</td>
                                            <td className="p-3 text-center border-l-1 border-gray-200">{formatPrice(item.price)}</td>
                                            <td className="p-3 text-center border-l-1 border-gray-200">{item.quantity}</td>
                                            <td className="p-3 text-center font-semibold border-l-1 border-gray-200">{formatPrice(item.subtotal)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* بخش جمع‌بندی و دکمه‌ها - کنار هم */}
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-6 pt-4 border-t border-gray-200">
                                {/* جمع‌بندی سبد خرید */}
                                <div className="bg-[#f9f9f9] p-4 rounded-xl min-w-[250px] w-full md:w-auto">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">جمع سبد خرید :</span>
                                        <strong className="text-gray-800">{formatPrice(subtotal)}</strong>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">هزینه ارسال :</span>
                                        <strong className="text-green-600">{shipping === 0 ? "رایگان" : formatPrice(shipping)}</strong>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-600">تخفیف :</span>
                                            <strong className="text-green-600">- {formatPrice(discount)}</strong>
                                        </div>
                                    )}
                                    <div className="flex justify-between pt-2 mt-1 border-t border-gray-200">
                                        <span className="text-gray-800 font-semibold">مبلغ قابل پرداخت :</span>
                                        <strong className="text-[#e0a96d] text-lg">{formatPrice(total)}</strong>
                                    </div>
                                </div>

                                {/* دکمه‌های اقدام */}
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <button
                                        onClick={() => router.push(`/track-order?code=${orderData?.order_id}`)}
                                        className="bg-[#e0a96d] text-white px-6 py-3 rounded-lg hover:bg-[#c9954d] transition text-center"
                                    >
                                        <Truck size={18} className="inline ml-2" />
                                        پیگیری سفارش
                                    </button>
                                    <button
                                        onClick={() => router.push("/")}
                                        className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition text-center"
                                    >
                                        <Home size={18} className="inline ml-2" />
                                        بازگشت به خانه
                                    </button>
                                </div>
                            </div>

                            {/* پیام تشکر */}
                            <div className="mt-6 p-4 bg-green-50 rounded-lg text-center">
                                <p className="text-green-700 text-sm">
                                    از خرید شما متشکریم. سفارش شما در سریع‌ترین زمان ممکن ارسال خواهد شد.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;