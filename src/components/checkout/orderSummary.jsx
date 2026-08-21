// src/components/common/Checkout/OrderSummary.jsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { AlertCircle } from "react-feather";
import 'react-loading-skeleton/dist/skeleton.css';

const OrderSummary = ({ cart, updating, formatPrice, onSubmitOrder, submitting }) => {
    if (!cart) {
        return (
            <div className="bg-white border border-gray-300 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                    سفارش شما
                </h3>
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex justify-between">
                            <Skeleton width={120} height={20} />
                            <Skeleton width={100} height={20} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-300">
            {/* جدول سفارشات */}
            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-50">
                    <th className="border-b border-gray-300 p-3 text-right font-semibold text-gray-700">
                        محصول
                    </th>
                    <th className="border-b border-gray-300 p-3 text-right font-semibold text-gray-700">
                        جمع جزء
                    </th>
                </tr>
                </thead>
                <tbody>
                {cart.items?.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200">
                        <td className="p-3 text-right">
                            {item.name} <strong className="text-gray-400">× {item.quantity}</strong>
                        </td>
                        <td className="p-3 text-right">
                            {updating ? (
                                <Skeleton width={100} height={20} />
                            ) : (
                                <span className="woocommerce-Price-amount amount">
                                        {formatPrice(item.subtotal)}
                                    </span>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                {/* جمع جزء */}
                <tr className="cart-subtotal border-b border-gray-200">
                    <th className="p-3 text-right font-semibold text-gray-700">جمع جزء</th>
                    <td className="p-3 text-right">
                        {updating ? (
                            <Skeleton width={120} height={20} />
                        ) : (
                            <span className="woocommerce-Price-amount amount">
                                    {formatPrice(cart.subtotal)}
                                </span>
                        )}
                    </td>
                </tr>

                {/* تخفیف */}
                {cart.discount > 0 && (
                    <tr className="border-b border-gray-200">
                        <th className="p-3 text-right font-semibold text-gray-700">
                            تخفیف {cart.coupon_code && <span className="text-xs text-green-600">({cart.coupon_code})</span>}
                        </th>
                        <td className="p-3 text-right">
                            {updating ? (
                                <Skeleton width={100} height={20} />
                            ) : (
                                <span className="text-red-500">-{formatPrice(cart.discount)}</span>
                            )}
                        </td>
                    </tr>
                )}

                {/* هزینه ارسال */}
                {cart.shipping_fee > 0 && (
                    <tr className="border-b border-gray-200">
                        <th className="p-3 text-right font-semibold text-gray-700">هزینه ارسال</th>
                        <td className="p-3 text-right">
                            {updating ? (
                                <Skeleton width={100} height={20} />
                            ) : (
                                <span className="woocommerce-Price-amount amount">
                                    {formatPrice(cart.shipping_fee)}
                                </span>
                            )}
                        </td>
                    </tr>
                )}

                {/* مجموع کل */}
                <tr className="order-total">
                    <th className="p-3 text-right font-bold text-gray-800">مجموع</th>
                    <td className="p-3 text-right">
                        {updating ? (
                            <Skeleton width={130} height={24} />
                        ) : (
                            <strong className="text-[#64a39a] text-lg">
                                {formatPrice(cart.total)}
                            </strong>
                        )}
                    </td>
                </tr>
                </tfoot>
            </table>

            {/* بخش پرداخت */}
            <div id="payment" className="p-6">
                <ul className="wc_payment_methods payment_methods methods list-none mb-4">
                    <li>
                        <div className="woocommerce-info flex items-center gap-3 p-3 bg-emerald-50 border-t-4 border-[#64a39a] text-gray-700 text-sm">
                            <AlertCircle size={20} className="flex-shrink-0 text-[#64a39a]" />
                            <p className="text-sm">
                                پس از ثبت سفارش به درگاه پرداخت آنلاین ایران‌درگاه هدایت می‌شوید.
                            </p>
                        </div>
                    </li>
                </ul>

                <div className="mb-4">
                    <div className="">
                        <p className="text-lg text-[#334155]">سیاست های حریم خصوصی</p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onSubmitOrder}
                    disabled={submitting}
                    className="button alt w-full bg-[#64a39a] text-white py-3 px-4 font-semibold hover:bg-[#4a7d73] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    id="place_order"
                >
                    {submitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            در حال اتصال به درگاه...
                        </>
                    ) : 'پرداخت آنلاین'}
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;