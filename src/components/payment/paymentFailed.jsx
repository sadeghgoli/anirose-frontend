"use client";
// src/components/common/Payment/PaymentFailed.jsx
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { XCircle, Home, ShoppingBag, Copy } from "react-feather";

const PaymentFailed = ({ orderData, errorMessage, trackingCode, canRetry = false, retrying = false, onRetry }) => {
  const router = useRouter();
  const errorCircleRef = useRef(null);

  const formatPrice = (price) => {
    return (price || 0).toLocaleString() + " تومان";
  };

  const copyOrderCode = () => {
    const code =
      trackingCode || orderData?.tracking_code || orderData?.order_id;
    if (code) {
      navigator.clipboard.writeText(String(code));
      alert("کد سفارش کپی شد: " + code);
    } else {
      alert("کد سفارش یافت نشد");
    }
  };

  useEffect(() => {
    if (errorCircleRef.current) {
      errorCircleRef.current.style.transform = "scale(0)";
      setTimeout(() => {
        errorCircleRef.current.style.transition = "transform 0.5s ease";
        errorCircleRef.current.style.transform = "scale(1)";
      }, 100);
    }
  }, []);

  const items = orderData?.items || [];
  const subtotal = orderData?.total_amount || orderData?.subtotal || 0;
  const discount = orderData?.discount_amount || 0;
  const shipping = orderData?.shipping_cost || orderData?.shipping_fee || 0;
  const total = orderData?.final_amount || orderData?.total || 0;

  const displayCode =
    trackingCode ||
    orderData?.tracking_code ||
    orderData?.order_number ||
    orderData?.order_id ||
    "---";

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-[15rem]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white pt-4 rounded-xl shadow-lg overflow-hidden">
            {/* هدر با ضربدر خطا */}
            <div className="text-center mb-6">
              <div
                ref={errorCircleRef}
                className="w-20 h-20 mt-4 bg-red-500 rounded-full inline-flex items-center justify-center text-[45px] text-white mx-auto"
              >
                ✕
              </div>
              <h1 className="text-[#2c2c2c] text-[1.8rem] mt-4 mb-1">
                پرداخت ناموفق
              </h1>
              <p className="text-red-500 font-medium m-0">
                پرداخت شما با موفقیت انجام نشد
              </p>
            </div>

            {/* محتوا */}
            <div className="p-6">
              {/* کد سفارش با دکمه کپی */}
              <div className="bg-red-50 rounded-lg p-4 text-center mb-6">
                <span className="text-gray-600 ml-2">کد سفارش:</span>
                <span className="text-red-600 font-bold text-lg mx-2">
                  {displayCode}
                </span>
                <button
                  onClick={copyOrderCode}
                  className="bg-red-500 text-white px-4 py-1 rounded-lg text-sm hover:bg-red-600 transition inline-flex items-center gap-1"
                >
                  <Copy size={14} />
                  کپی
                </button>
              </div>

              {/* پیام خطا */}
              <div className="bg-red-50 rounded-lg p-4 text-center mb-6 border border-red-200">
                <XCircle size={20} className="inline-block text-red-500 ml-2" />
                <span className="text-red-700 font-medium">
                  {errorMessage ||
                    "متأسفانه پرداخت شما با موفقیت انجام نشد. لطفاً مجدداً تلاش کنید."}
                </span>
              </div>

              {/* جدول محصولات */}
              {items.length > 0 && (
                <>
                  <h3 className="font-bold text-lg text-gray-800 mb-3 border-r-3 border-red-500 pr-3">
                    📦 اقلام سفارش
                  </h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-[700px] md:min-w-full border-collapse">
                      <thead className="bg-gray-100 text-gray-500 border-b-2 border-red-300">
                        <tr>
                          <th className="p-3 text-center">تصویر</th>
                          <th className="p-3 text-center">نام محصول</th>
                          <th className="p-3 text-center">قیمت</th>
                          <th className="p-3 text-center">تعداد</th>
                          <th className="p-3 text-center">جمع</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, idx) => (
                          <tr key={idx} className="border-b border-gray-200">
                            <td className="p-3 text-center">
                              <Image
                                src={
                                  item.image || "/images/test/placeholder.jpg"
                                }
                                alt={item.name}
                                width={48}
                                height={48}
                                className="object-cover rounded mx-auto"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = "/images/test/placeholder.jpg";
                                }}
                              />
                            </td>
                            <td className="p-3 text-center font-medium">
                              {item.name}
                            </td>
                            <td className="p-3 text-center">
                              {formatPrice(item.price)}
                            </td>
                            <td className="p-3 text-center">{item.quantity}</td>
                            <td className="p-3 text-center font-semibold">
                              {formatPrice(item.subtotal)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {/* بخش جمع‌بندی */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-6 pt-4 border-t border-gray-200">
                <div className="bg-[#f9f9f9] p-4 rounded-xl min-w-[250px] w-full md:w-auto">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">جمع سبد خرید :</span>
                    <strong className="text-gray-800">
                      {formatPrice(subtotal)}
                    </strong>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">هزینه ارسال :</span>
                    <strong className="text-green-600">
                      {shipping === 0 ? "رایگان" : formatPrice(shipping)}
                    </strong>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">تخفیف :</span>
                      <strong className="text-green-600">
                        - {formatPrice(discount)}
                      </strong>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 mt-1 border-t border-gray-200">
                    <span className="text-gray-800 font-semibold">
                      مبلغ قابل پرداخت :
                    </span>
                    <strong className="text-red-500 text-lg">
                      {formatPrice(total)}
                    </strong>
                  </div>
                </div>

                {/* دکمه‌های اقدام */}
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  {canRetry && (
                    <button
                      onClick={onRetry}
                      disabled={retrying}
                      className="bg-[#64a39a] text-white px-6 py-3 rounded-lg hover:bg-[#4a7d73] transition text-center disabled:opacity-50"
                    >
                      {retrying ? "در حال اتصال به درگاه..." : "تلاش مجدد پرداخت"}
                    </button>
                  )}
                  <button
                    onClick={() => router.push("/cart")}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition text-center"
                  >
                    <ShoppingBag size={18} className="inline ml-2" />
                    بازگشت به سبد خرید
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

              {/* پیام بازگشت وجه */}
              <div className="mt-6 p-4 bg-red-50 rounded-lg text-center">
                <p className="text-red-700 text-sm">
                  در صورت کسر وجه از حساب شما، طی ۷۲ ساعت آینده به حساب شما
                  بازگردانده خواهد شد.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
