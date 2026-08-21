'use client'
import { useState, useEffect, useCallback } from 'react';
import { fetchCart, updateCartItem, removeCartItem, applyCoupon, removeCoupon, updateCart } from '../api/services/cart.js';

export const useCart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [totalsLoading, setTotalsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const loadCart = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchCart();
            if (response.status === "success") {
                setCart(response.data);
            } else {
                setError(response.message || "خطا در دریافت سبد خرید");
            }
        } catch (err) {
            setError(err?.response?.data?.message || "خطا در ارتباط با سرور");
        } finally {
            setLoading(false);
        }
    }, []);

    const handleUpdateQuantity = useCallback(async (cartItemId, quantity) => {
        setUpdating(true);
        setError(null);
        try {
            await updateCartItem(cartItemId, quantity);
            await loadCart();
            setSuccessMessage("تعداد محصول با موفقیت به‌روزرسانی شد");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(err?.response?.data?.message || "خطا در به‌روزرسانی تعداد");
        } finally {
            setUpdating(false);
        }
    }, [loadCart]);

    const handleRemoveItem = useCallback(async (cartItemId) => {
        setUpdating(true);
        setError(null);
        try {
            await removeCartItem(cartItemId);
            await loadCart();
            setSuccessMessage("محصول با موفقیت حذف شد");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(err?.response?.data?.message || "خطا در حذف محصول");
        } finally {
            setUpdating(false);
        }
    }, [loadCart]);

    const handleApplyCoupon = useCallback(async (couponCode) => {
        if (!couponCode.trim()) {
            setError("لطفاً کد تخفیف را وارد کنید");
            return false;
        }
        setTotalsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            await applyCoupon(couponCode, 'discount');
            await loadCart();
            setSuccessMessage("کد تخفیف با موفقیت اعمال شد");
            setTimeout(() => setSuccessMessage(null), 3000);
            return true;
        } catch (err) {
            setError(err?.response?.data?.message || "کد تخفیف نامعتبر است");
            return false;
        } finally {
            setTotalsLoading(false);
        }
    }, [loadCart]);

    const handleRemoveCoupon = useCallback(async (type = 'discount') => {
        setUpdating(true);
        setError(null);
        try {
            await removeCoupon(type);
            await loadCart();
            setSuccessMessage("کد تخفیف حذف شد");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(err?.response?.data?.message || "خطا در حذف کد تخفیف");
        } finally {
            setUpdating(false);
        }
    }, [loadCart]);

    const handleUpdateCart = useCallback(async () => {
        if (!cart?.items) return;
        setUpdating(true);
        setError(null);
        try {
            await updateCart();
            await loadCart();
            setSuccessMessage("سبد خرید با موفقیت بروزرسانی شد");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            setError(err?.response?.data?.message || "خطا در بروزرسانی سبد خرید");
        } finally {
            setUpdating(false);
        }
    }, [cart, loadCart]);

    const updateLocalQuantity = useCallback((cartItemId, quantity) => {
        setCart(prev => {
            if (!prev) return prev;
            const newItems = prev.items.map(item =>
                item.cart_item_id === cartItemId
                    ? { ...item, quantity, subtotal: item.price * quantity }
                    : item
            );
            const newSubtotal = newItems.reduce((sum, item) => sum + item.subtotal, 0);
            const newTotal = newSubtotal - (prev.discount || 0);
            return { ...prev, items: newItems, subtotal: newSubtotal, total: newTotal };
        });
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadCart();
    }, [loadCart]);

    return {
        cart,
        loading,
        updating,
        totalsLoading,
        error,
        successMessage,
        updateQuantity: handleUpdateQuantity,
        updateLocalQuantity,
        removeItem: handleRemoveItem,
        applyCoupon: handleApplyCoupon,
        removeCoupon: handleRemoveCoupon,
        updateCart: handleUpdateCart,
        refreshCart: loadCart
    };
};
