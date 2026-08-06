"use client";
// src/components/common/Payment/PaymentPage.jsx
import React from "react";
import { usePayment } from "../../hooks/usePayment";
import PaymentLoading from "./paymentSkeleton.jsx";
import PaymentSuccess from "./paymentSuccess";
import PaymentFailed from "./paymentFailed";

const PaymentPage = () => {
    const { loading, paymentResult, orderData, error, trackingCode } = usePayment();

    if (loading) {
        return <PaymentLoading />;
    }

    if (error || paymentResult?.status === "nok") {
        return <PaymentFailed
            orderData={orderData}
            errorMessage={error || paymentResult?.message}
            trackingCode={trackingCode}
        />;
    }

    if (paymentResult?.status === "ok" && orderData) {
        return <PaymentSuccess
            orderData={orderData}
            trackingCode={trackingCode}
        />;
    }

    // return <PaymentFailed orderData={orderData} errorMessage={error || paymentResult?.message} trackingCode={trackingCode}/>;

};

export default PaymentPage;