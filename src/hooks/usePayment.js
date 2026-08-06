'use client'
import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { clearCart } from "../api/services/cart.js";

export const usePayment = () => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [paymentResult, setPaymentResult] = useState(null);
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState(null);
    const [trackingCode, setTrackingCode] = useState(null);

    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const verifyPaymentStatus = async () => {
            setLoading(true);

            const authority = searchParams.get("Authority");
            const status = searchParams.get("Status");
            const orderId = searchParams.get("order_id");
            const tracking = searchParams.get("tracking");

            if (tracking) {
                setTrackingCode(tracking);
            }

            if (!authority && !orderId && !tracking) {
                const cachedResult = sessionStorage.getItem("payment_result");
                if (cachedResult) {
                    const parsed = JSON.parse(cachedResult);
                    setPaymentResult(parsed);
                    if (parsed.data) {
                        setOrderData(parsed.data);
                    } else {
                        setError(parsed.message);
                    }
                    setLoading(false);
                    return;
                }
                setError("اطلاعات پرداخت یافت نشد");
                setLoading(false);
                return;
            }

            try {
                if (status === "OK" || authority) {
                    const result = {
                        status: "ok",
                        code: 100,
                        message: "پرداخت با موفقیت انجام شد",
                        data: {
                            order_id: orderId || "",
                            tracking_code: tracking || "",
                        },
                    };

                    sessionStorage.setItem("payment_result", JSON.stringify(result));
                    setPaymentResult(result);

                    if (result.data) {
                        setOrderData(result.data);
                        if (result.data.tracking_code) {
                            setTrackingCode(result.data.tracking_code);
                        }
                        clearCart();
                    }
                } else {
                    setPaymentResult({
                        status: "nok",
                        code: 101,
                        message: "پرداخت ناموفق بود. لطفاً مجدداً تلاش کنید.",
                    });
                    setError("پرداخت ناموفق بود");
                }

                const newParams = new URLSearchParams();
                if (tracking) {
                    newParams.set("tracking", tracking);
                }
                router.replace(`/payment${newParams.toString() ? `?${newParams.toString()}` : ''}`);

            } catch (err) {
                console.error("❌ Payment verification error:", err);
                setError("خطا در تأیید پرداخت");
            } finally {
                setLoading(false);
            }
        };

        verifyPaymentStatus();
    }, [router, searchParams]);

    return { loading, paymentResult, orderData, error, trackingCode };
};
