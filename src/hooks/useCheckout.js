'use client'
import { useState, useEffect, useCallback } from 'react';
import { fetchCart, applyCoupon, removeCoupon, selectShipping, checkoutCart } from '../api/services/cart.js';
import { fetchShippingMethods } from '../api/services/shipping.js';
import { fetchAddresses } from '../api/services/addresses.js';
import { extractOrderFromResponse, startOrderPayment } from '../api/services/orders.js';

export const useCheckout = () => {
    const [cart, setCart] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [selectedShippingId, setSelectedShippingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [orderResult, setOrderResult] = useState(null);

    const loadData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [cartRes, shippingRes, addrRes] = await Promise.all([
                fetchCart(),
                fetchShippingMethods(),
                fetchAddresses(),
            ]);

            if (cartRes.status === "success") {
                setCart(cartRes.data);
            }
            if (shippingRes.status === "success") {
                const methods = shippingRes.data || [];
                setShippingMethods(methods);
                const defaultMethod = cartRes.data?.shipping?.id || methods.find((m) => m.is_active)?.id || methods[0]?.id || null;
                if (defaultMethod) {
                    setSelectedShippingId(defaultMethod);
                    if (cartRes.data?.shipping?.id !== defaultMethod) {
                        selectShipping(defaultMethod).catch(() => {});
                    }
                }
            }
            const list = addrRes.data || [];
            setAddresses(list);
            const defaultAddr = list.find((a) => a.is_default) || list[0];
            setSelectedAddressId(defaultAddr?.id || null);
        } catch (err) {
            setError(err?.response?.data?.message || "خطا در بارگذاری اطلاعات");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadData();
    }, [loadData]);

    const refreshCart = useCallback(async () => {
        try {
            const cartRes = await fetchCart();
            if (cartRes.status === "success") {
                setCart(cartRes.data);
                if (cartRes.data?.shipping?.id) {
                    setSelectedShippingId(cartRes.data.shipping.id);
                }
            }
        } catch (err) {
            setError(err?.response?.data?.message || "خطا در بارگذاری سبد خرید");
        }
    }, []);

    const handleApplyCoupon = useCallback(async (couponCode) => {
        if (!couponCode.trim()) {
            setError("لطفاً کد تخفیف را وارد کنید");
            return false;
        }
        setUpdating(true);
        setError(null);
        try {
            await applyCoupon(couponCode, 'discount');
            await refreshCart();
            setSuccessMessage("کد تخفیف با موفقیت اعمال شد");
            setTimeout(() => setSuccessMessage(null), 3000);
            return true;
        } catch (err) {
            setError(err?.response?.data?.message || "کد تخفیف نامعتبر است");
            return false;
        } finally {
            setUpdating(false);
        }
    }, [refreshCart]);

    const handleRemoveCoupon = useCallback(async (type = 'discount') => {
        setUpdating(true);
        setError(null);
        try {
            await removeCoupon(type);
            await refreshCart();
            setSuccessMessage("کد تخفیف حذف شد");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(err?.response?.data?.message || "خطا در حذف کد تخفیف");
        } finally {
            setUpdating(false);
        }
    }, [refreshCart]);

    const handleSelectShipping = useCallback(async (shippingMethodId) => {
        setSelectedShippingId(shippingMethodId);
        setUpdating(true);
        setError(null);
        try {
            await selectShipping(shippingMethodId);
            await refreshCart();
        } catch (err) {
            setError(err?.response?.data?.message || "خطا در انتخاب روش ارسال");
        } finally {
            setUpdating(false);
        }
    }, [refreshCart]);

    const handlePlaceOrder = useCallback(async ({ address_id, notes = '' }) => {
        if (!address_id) {
            setError("لطفاً یک آدرس را انتخاب کنید");
            return { success: false, error: "لطفاً یک آدرس را انتخاب کنید" };
        }
        setSubmitting(true);
        setError(null);

        let redirected = false;
        try {
            const response = await checkoutCart({ address_id, notes });
            const order = extractOrderFromResponse(response);
            const orderId = order?.id || order?.order_id;

            if (!orderId) {
                const msg = "سفارش ثبت شد اما شناسه سفارش دریافت نشد";
                setError(msg);
                return { success: false, error: msg };
            }

            try {
                await startOrderPayment(orderId, order.payment_status);
                redirected = true;
                return { success: true, redirected: true, data: order };
            } catch (payErr) {
                const payMsg = payErr?.response?.data?.message || payErr?.message || 'سفارش ثبت شد اما اتصال به درگاه ناموفق بود';
                setOrderResult(order);
                setError(payMsg);
                return { success: false, error: payMsg, data: order };
            }
        } catch (err) {
            const msg = err?.response?.data?.message || "خطا در ثبت سفارش";
            setError(msg);
            return { success: false, error: msg };
        } finally {
            if (!redirected) {
                setSubmitting(false);
            }
        }
    }, []);

    const handleRetryPayment = useCallback(async () => {
        if (!orderResult?.id) {
            return { success: false, error: "شناسه سفارش نامعتبر است" };
        }
        setSubmitting(true);
        setError(null);
        let redirected = false;
        try {
            await startOrderPayment(orderResult.id, orderResult.payment_status);
            redirected = true;
            return { success: true, redirected: true };
        } catch (err) {
            const msg = err?.response?.data?.message || err?.message || "اتصال به درگاه ناموفق بود";
            setError(msg);
            return { success: false, error: msg };
        } finally {
            if (!redirected) {
                setSubmitting(false);
            }
        }
    }, [orderResult]);

    const formatPrice = (price) => (price || 0).toLocaleString() + ' تومان';

    return {
        cart,
        addresses,
        shippingMethods,
        selectedAddressId,
        selectedShippingId,
        setSelectedAddressId,
        loading,
        submitting,
        updating,
        error,
        successMessage,
        orderResult,
        handleApplyCoupon,
        handleRemoveCoupon,
        handleSelectShipping,
        handlePlaceOrder,
        handleRetryPayment,
        refreshCart,
        formatPrice
    };
};
