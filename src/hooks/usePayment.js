'use client'
import { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { clearCart } from "../api/services/cart.js";
import {
    fetchOrderById,
    fetchPaymentStatus,
    findOrderIdByNumber,
    getPendingPaymentOrderId,
    clearPendingPaymentOrder,
    startOrderPayment,
} from "../api/services/orders.js";

export const usePayment = () => {
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState(true);
    const [paymentResult, setPaymentResult] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);
    const [trackingCode, setTrackingCode] = useState(null);
    const [retrying, setRetrying] = useState(false);
    const [resolvedOrderId, setResolvedOrderId] = useState(null);

    const hasRun = useRef(false);

    const resolveOrderId = useCallback(async () => {
        const fromQuery = searchParams.get("order_id");
        if (fromQuery) return fromQuery;

        const stored = getPendingPaymentOrderId();
        if (stored) return stored;

        const orderNumber = searchParams.get("order_number");
        if (orderNumber) {
            return findOrderIdByNumber(orderNumber);
        }

        return null;
    }, [searchParams]);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const verifyPaymentStatus = async () => {
            setLoading(true);
            setError(null);

            try {
                const orderId = await resolveOrderId();
                if (!orderId) {
                    setError("اطلاعات پرداخت یافت نشد");
                    setPaymentResult({ status: "nok" });
                    setLoading(false);
                    return;
                }

                setResolvedOrderId(orderId);

                const [statusData, order] = await Promise.all([
                    fetchPaymentStatus(orderId),
                    fetchOrderById(orderId),
                ]);

                if (order) {
                    setOrderData(order);
                    setTrackingCode(order.order_number || statusData?.ref_id || null);
                }

                const paymentStatus = statusData?.payment_status || order?.payment_status;
                const callbackMessage = searchParams.get("message");

                if (paymentStatus === "paid") {
                    clearPendingPaymentOrder();
                    clearCart().catch(() => {});
                    setPaymentResult({
                        status: "ok",
                        code: 100,
                        message: callbackMessage || statusData?.payment_status_label || "پرداخت با موفقیت انجام شد",
                        data: order,
                    });
                    return;
                }

                setPaymentResult({
                    status: "nok",
                    code: 101,
                    message: callbackMessage || statusData?.payment_status_label || "پرداخت ناموفق بود",
                    data: order,
                });
                setError(
                    callbackMessage
                    || (paymentStatus === "pending" ? "پرداخت تکمیل نشد. در صورت تمایل دوباره تلاش کنید." : "پرداخت ناموفق بود. لطفاً مجدداً تلاش کنید.")
                );
            } catch (err) {
                setPaymentResult({ status: "nok", code: 101 });
                setError(err?.response?.data?.message || "خطا در تأیید پرداخت");
            } finally {
                setLoading(false);
            }
        };

        verifyPaymentStatus();
    }, [resolveOrderId, searchParams]);

    const retryPayment = useCallback(async () => {
        const orderId = resolvedOrderId || orderData?.id || getPendingPaymentOrderId();
        if (!orderId) {
            setError("شناسه سفارش برای پرداخت مجدد یافت نشد");
            return;
        }

        setRetrying(true);
        setError(null);
        try {
            await startOrderPayment(orderId, orderData?.payment_status);
        } catch (err) {
            setError(err?.response?.data?.message || err?.message || "اتصال به درگاه ناموفق بود");
            setRetrying(false);
        }
    }, [orderData, resolvedOrderId]);

    const canRetry = paymentResult?.status === "nok" && !!(resolvedOrderId || orderData?.id);

    return { loading, paymentResult, orderData, error, trackingCode, canRetry, retrying, retryPayment };
};
