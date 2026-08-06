'use client'
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchOrders } from "../../api/services/orders.js";
import UserPanelLayout from "../../components/common/UserPanelLayout.jsx";
import { Package, ChevronLeft, ShoppingBag } from "react-feather";

const statusColors = {
  pending_review: "bg-yellow-100 text-yellow-800",
  packaging: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const formatPrice = (price) => (price || 0).toLocaleString("fa-IR") + " تومان";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchOrders();
        setOrders(result.orders || []);
      } catch (e) {
        console.error("Error loading orders:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <UserPanelLayout title="سفارش‌های من">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Package size={22} className="text-[#0c5505]" />
          سفارش‌های من
        </h1>
        {!loading && orders.length > 0 && (
          <span className="text-xs bg-[#F4F7F5] text-[#0c5505] px-3 py-1.5 rounded-full font-medium">
            {orders.length} سفارش
          </span>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16 text-gray-500">در حال بارگذاری...</div>
      ) : orders.length === 0 ? (
        <div className="bg-[#F4F7F5] rounded-2xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0c5505]/10 text-[#0c5505] flex items-center justify-center">
            <ShoppingBag size={28} />
          </div>
          <p className="text-gray-600 font-medium mb-6">شما هنوز سفارشی ثبت نکرده‌اید</p>
          <Link href="/shop" className="inline-block bg-[#0c5505] text-white px-8 py-3 rounded-xl hover:bg-[#0a4304] transition-colors">
            مشاهده فروشگاه
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-[#0c5505]/20 transition-all group"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F4F7F5] flex items-center justify-center text-[#0c5505]">
                    <Package size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">شماره سفارش</p>
                    <p className="font-bold text-gray-800" dir="ltr">{order.order_number}</p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end gap-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.shipping_status] || "bg-gray-100 text-gray-700"}`}>
                    {order.shipping_status_label}
                  </span>
                  <p className="font-bold text-lg text-[#0c5505]">{formatPrice(order.final_amount)}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{new Date(order.created_at).toLocaleDateString("fa-IR")}</span>
                  <span>{order.items_count} کالا</span>
                </div>
                <span className="flex items-center gap-1 text-[#0c5505] text-xs font-medium group-hover:translate-x-[-4px] transition-transform">
                  مشاهده جزئیات <ChevronLeft size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </UserPanelLayout>
  );
};

export default Orders;
