'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchOrderById, cancelOrder, startOrderPayment } from "../../api/services/orders.js";
import { toast } from "react-toastify";
import Link from "next/link";
import UserPanelLayout from "../../components/common/UserPanelLayout.jsx";
import { Package, Truck, MapPin, User as UserIcon, CreditCard, ChevronLeft, XCircle } from "react-feather";

const formatPrice = (price) => (price || 0).toLocaleString("fa-IR") + " تومان";

const statusColors = {
  pending_review: "bg-yellow-100 text-yellow-800",
  packaging: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const OrderDetail = ({ id }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState(false);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchOrderById(id);
        setOrder(result);
      } catch (e) {
        console.error("Error loading order:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handlePay = async () => {
    if (!order?.id) return;
    setPaying(true);
    try {
      await startOrderPayment(order.id, order.payment_status);
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "اتصال به درگاه ناموفق بود");
      setPaying(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("آیا از لغو این سفارش اطمینان دارید؟")) return;
    setCancelling(true);
    try {
      const result = await cancelOrder(id);
      if (result?.message) toast.success(result.message);
      const updated = await fetchOrderById(id);
      setOrder(updated);
    } catch (err) {
      toast.error(err?.response?.data?.message || "خطا در لغو سفارش");
    } finally {
      setCancelling(false);
    }
  };

  return (
    <UserPanelLayout title="جزئیات سفارش">
      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">در حال بارگذاری...</div>
      ) : !order ? (
        <div className="bg-[#F4F7F5] rounded-2xl p-12 text-center">
          <p className="text-gray-500 mb-6">سفارش یافت نشد</p>
          <Link href="/orders" className="inline-block bg-[#0c5505] text-white px-6 py-3 rounded-xl hover:bg-[#0a4304] transition-colors">
            بازگشت به سفارش‌ها
          </Link>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
                <Package size={22} className="text-[#0c5505]" />
                جزئیات سفارش
              </h1>
              <p dir="ltr" className="text-sm text-gray-500 mt-1">{order.order_number}</p>
            </div>
            <Link href="/orders" className="flex items-center gap-1 text-[#0c5505] text-sm hover:underline">
              <ChevronLeft size={16} /> همه سفارش‌ها
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium ${statusColors[order.shipping_status] || "bg-gray-100 text-gray-700"}`}>
              <Truck size={15} /> {order.shipping_status_label}
            </span>
            <span className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium ${order.payment_status === "paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-800"}`}>
              <CreditCard size={15} /> {order.payment_status_label}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-[#F4F7F5] rounded-xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0c5505]/10 text-[#0c5505] flex items-center justify-center flex-shrink-0">
                <Truck size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">روش ارسال</p>
                <p className="font-medium text-gray-800">{order.shipping_method || "-"}</p>
              </div>
            </div>
            <div className="bg-[#F4F7F5] rounded-xl p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0c5505]/10 text-[#0c5505] flex items-center justify-center flex-shrink-0">
                <UserIcon size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">گیرنده</p>
                <p className="font-medium text-gray-800">{order.shipping_recipient_name || "-"}</p>
              </div>
            </div>
            <div className="bg-[#F4F7F5] rounded-xl p-4 flex items-start gap-3 sm:col-span-2">
              <div className="w-9 h-9 rounded-full bg-[#0c5505]/10 text-[#0c5505] flex items-center justify-center flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">آدرس ارسال</p>
                <p className="font-medium text-gray-800 leading-6">
                  {order.shipping_address || "-"}
                  <span className="text-gray-500 block text-sm mt-1">
                    {order.shipping_city} - {order.shipping_state}
                  </span>
                  {order.shipping_postal_code && (
                    <span className="text-gray-500 block text-sm" dir="ltr">کد پستی: {order.shipping_postal_code}</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          <h3 className="font-bold text-gray-800 mb-4">محصولات سفارش</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="p-3 text-right text-sm text-gray-500 font-medium">محصول</th>
                  <th className="p-3 text-right text-sm text-gray-500 font-medium">قیمت واحد</th>
                  <th className="p-3 text-right text-sm text-gray-500 font-medium">تعداد</th>
                  <th className="p-3 text-right text-sm text-gray-500 font-medium">جمع</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        {item.product_image && (
                          <Image src={item.product_image || "/images/test/placeholder.jpg"} alt={item.product_name} width={48} height={48} className="object-cover rounded-lg" loading="lazy" />
                        )}
                        <span className="font-medium text-gray-800">{item.product_name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{formatPrice(item.unit_price)}</td>
                    <td className="p-3 text-gray-600">{item.quantity}</td>
                    <td className="p-3 font-semibold text-gray-800">{formatPrice(item.final_price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-[#F4F7F5] rounded-2xl p-5 space-y-2.5 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">جمع کل</span>
              <span className="font-semibold text-gray-800">{formatPrice(order.total_amount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">هزینه ارسال</span>
              <span className="font-semibold text-gray-800">{formatPrice(order.shipping_fee)}</span>
            </div>
            {order.discount_amount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">تخفیف</span>
                <span className="font-semibold text-green-600">-{formatPrice(order.discount_amount)}</span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="font-bold text-gray-800">مبلغ قابل پرداخت</span>
              <span className="font-bold text-lg text-[#0c5505]">{formatPrice(order.final_amount)}</span>
            </div>
          </div>

          {(order.can_pay || ((order.payment_status === "pending" || order.payment_status === "failed") && order.shipping_status !== "cancelled")) && (
            <div className="text-center mb-4">
              <button
                onClick={handlePay}
                disabled={paying}
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#0c5505] text-white rounded-xl hover:bg-[#0a4304] transition-colors disabled:opacity-70 font-medium"
              >
                <CreditCard size={18} />
                {paying ? "در حال اتصال به درگاه..." : "پرداخت آنلاین"}
              </button>
            </div>
          )}

          {(order.shipping_status === "pending_review" || order.shipping_status === "packaging") && (
            <div className="text-center mb-6">
              <button
                onClick={handleCancel}
                disabled={cancelling}
                className="inline-flex items-center gap-2 px-8 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors disabled:opacity-70 font-medium"
              >
                <XCircle size={18} />
                {cancelling ? "در حال لغو..." : "لغو سفارش"}
              </button>
            </div>
          )}

          {order.histories?.length > 0 && (
            <div>
              <h3 className="font-bold text-gray-800 mb-4">تاریخچه سفارش</h3>
              <div className="space-y-3">
                {order.histories.map((h, i) => (
                  <div key={h.id} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${i === 0 ? "bg-[#0c5505]" : "bg-gray-300"} flex-shrink-0 mt-1.5`} />
                      {i < order.histories.length - 1 && <div className="w-px flex-1 bg-gray-200" />}
                    </div>
                    <div className="pb-4">
                      <p className="font-medium text-gray-800 text-sm">{h.note}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{new Date(h.created_at).toLocaleDateString("fa-IR")} - {new Date(h.created_at).toLocaleTimeString("fa-IR")}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </UserPanelLayout>
  );
};

export default OrderDetail;
