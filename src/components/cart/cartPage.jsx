"use client";
// src/components/common/Checkout/CartPage.jsx
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { RefreshCw, Trash2 } from "react-feather";
import { useCart } from "../../hooks/useCart";
import CartTotals from "./cartTotals";
import CouponForm from "./couponForm";
import CartPageSkeleton from "../skeleton/Cart/CartSkeleton.jsx";

const CartPage = () => {
  const {
    cart,
    loading,
    updating,
    totalsLoading,
    error,
    successMessage,
    updateQuantity,
    updateLocalQuantity,
    removeItem,
    applyCoupon,
    updateCart,
  } = useCart();

  if (loading) return <CartPageSkeleton />;

  const formatPrice = (price) => (price || 0).toLocaleString() + " تومان";

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">سبد خرید</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-600">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded text-green-600">
            {successMessage}
          </div>
        )}

        {/* ========== دسکتاپ - نمای جدولی ========== */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full border border-gray-300 border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b border-gray-300 p-3 text-right">حذف</th>
                <th className="border-b border-gray-300 p-3 text-right">
                  تصویر
                </th>
                <th className="border-b border-gray-300 p-3 text-right">
                  محصول
                </th>
                <th className="border-b border-gray-300 p-3 text-right">
                  قیمت
                </th>
                <th className="border-b border-gray-300 p-3 text-right">
                  تعداد
                </th>
                <th className="border-b border-gray-300 p-3 text-right">
                  جمع جزء
                </th>
              </tr>
            </thead>
            <tbody>
              {cart?.items?.map((item) => (
                <tr key={item.cart_item_id} className="hover:bg-gray-50">
                  <td className="border-b border-gray-300 p-3 text-center">
                    <button
                      onClick={() => removeItem(item.cart_item_id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                  <td className="border-b border-gray-300 p-3">
                    <Image
                      src={item.image || "/images/test/placeholder.jpg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover"
                      loading="lazy"
                    />
                  </td>
                  <td className="border-b border-gray-300 p-3">
                    <span className="font-medium">{item.name}</span>
                  </td>
                  <td className="border-b border-gray-300 p-3">
                    {formatPrice(item.price)}
                  </td>
                  <td className="border-b border-gray-300 p-3">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQty = parseInt(e.target.value);
                        if (newQty >= 1) {
                          updateLocalQuantity(item.cart_item_id, newQty);
                          updateQuantity(item.cart_item_id, newQty);
                        }
                      }}
                      aria-label={`تعداد ${item.name}`}
                      className="w-20 px-2 py-1 border border-gray-300 text-center focus:outline-none focus:border-[#64a39A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </td>
                  <td className="border-b border-gray-300 p-3 font-semibold">
                    {formatPrice(item.subtotal)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50">
                <td colSpan="6" className="border border-gray-300 p-3">
                  <div className="flex justify-between items-center gap-4">
                    <CouponForm
                      onApplyCoupon={applyCoupon}
                      updating={updating}
                      error={error}
                      successMessage={successMessage}
                      onSuccessOnlySidebar={true}
                    />
                    <button
                      onClick={updateCart}
                      disabled={updating || !cart?.items?.length}
                      className="flex items-center whitespace-nowrap gap-2 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
                    >
                      <RefreshCw
                        size={16}
                        className={updating ? "animate-spin" : ""}
                      />
                      بروزرسانی سبد خرید
                    </button>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* ========== موبایل - نمای ستونی با ارتفاع محدود ========== */}
        <div className="block md:hidden max-h-[500px] overflow-y-auto">
          {cart?.items?.map((item) => (
            <div
              key={item.cart_item_id}
              className="border border-gray-300 mb-4 p-3 bg-white"
            >
              {/* دکمه حذف - سمت چپ */}
              <div className="flex justify-start mb-3">
                <button
                  onClick={() => removeItem(item.cart_item_id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* تصویر */}
              <div className="flex justify-center border-t border-gray-300 pt-2 items-center mb-3">
                <Image
                  src={item.image || "/images/test/placeholder.jpg"}
                  alt={item.name}
                  width={96}
                  height={96}
                  className="object-contain"
                  loading="lazy"
                />
              </div>

              {/* نام محصول */}
              <div className="flex justify-between border-t border-gray-300 mt-2 py-2">
                <span className="text-gray-500">نام محصول:</span>
                <span className="font-medium block text-left">{item.name}</span>
              </div>

              {/* قیمت */}
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">قیمت:</span>
                <span className="text-left">{formatPrice(item.price)}</span>
              </div>

              {/* تعداد */}
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">تعداد:</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => {
                    const newQty = parseInt(e.target.value);
                    if (newQty >= 1) {
                      updateLocalQuantity(item.cart_item_id, newQty);
                      updateQuantity(item.cart_item_id, newQty);
                    }
                  }}
                  aria-label={`تعداد ${item.name}`}
                  className="w-20 px-2 py-1 border border-gray-300 text-center focus:outline-none focus:border-[#64a39A] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>

              {/* جمع جزء */}
              <div className="flex justify-between pt-2 mt-2 border-t border-dashed border-gray-300">
                <span className="font-semibold">جمع جزء:</span>
                <span className="font-semibold text-left">
                  {formatPrice(item.subtotal)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ========== موبایل - کوپن و دکمه بروزرسانی ========== */}
        {cart?.items?.length > 0 && (
          <div className="block md:hidden mt-4 space-y-3">
            <div className="border border-gray-300 bg-white p-3">
              <CouponForm
                onApplyCoupon={applyCoupon}
                updating={updating}
                error={error}
                successMessage={successMessage}
                onSuccessOnlySidebar={true}
              />
            </div>
            <button
              onClick={updateCart}
              disabled={updating || !cart?.items?.length}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              <RefreshCw size={16} className={updating ? "animate-spin" : ""} />
              بروزرسانی سبد خرید
            </button>
          </div>
        )}

        {/* سایدبار جمع کل */}
        {cart?.items?.length > 0 && (
          <div className="mt-8 flex justify-end">
            <div className="w-full md:w-1/2 border border-gray-300 bg-white p-5">
              <CartTotals
                subtotal={cart?.subtotal || 0}
                discount={cart?.discount || 0}
                total={cart?.total || 0}
                shippingFee={cart?.shipping_fee || 0}
                couponCode={cart?.coupon_code}
                loading={totalsLoading}
              />
            </div>
          </div>
        )}

        {/* سبد خالی */}
        {(!cart?.items || cart?.items?.length === 0) && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              سبد خرید شما خالی است
            </h3>
            <p className="text-gray-500 mb-6">
              برای مشاهده محصولات به فروشگاه مراجعه کنید
            </p>
            <Link
              href="/shop"
              className="inline-block bg-[#64a39a] text-white px-6 py-3"
            >
              مشاهده فروشگاه
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
